import { observable, computed, action } from "mobx";

import PostModel, { generatePost } from "./PostModel";

// At some point this will be factored out into one class for user home (store.home)
// and one class for /all page (store.all)
export default class HomePageModel {
	@observable
	posts = [];

	@observable
	after = undefined;

	@observable
	pageSize = 20;

	@observable
	requestInProgress = false;

	@observable
	error = "";

	@computed get currentPage() {
		if (this.error)
			return [];

		let start = this.after !== undefined ? this.posts.findIndex(x => x.created_at > this.after) : 0;

		return this.posts.slice(start, start + this.pageSize);
	}

	@computed get hasPrev() {
		return this.after !== undefined;
	}

	@action
	loadPrevPage = () => {
		if (!this.hasPrev)
			return;

		const startCur = this.posts.findIndex(x => x.created_at > this.after);
		const startPrev = startCur - this.pageSize;

		if (startPrev <= 0) {
			this.after = undefined;
		} else {
			this.after = posts[startPrev - 1].created_at;
		}
	}

	@action
	loadNextPage = () => {
		if (this.posts.length > 0)
			this.after = this.posts[this.posts.length - 1].created_at;

		// TODO: Make actual requests to server
		this.requestInProgress = true;

		setTimeout(action(() => {
			// Simulate an error
			if (this.posts.length > 40) {
				this.error = "No more posts!";
			} else {
				for (let i = 0; i < this.pageSize; i++) {
					this.posts.push(generatePost());
				}
			}
			this.requestInProgress = false;
		}), 1000);
	}
}