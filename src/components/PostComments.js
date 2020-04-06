import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { sanitize } from "dompurify";

import VoteArrows from './VoteArrows';
import { PaginationWrapper } from './Utils';
import { friendlyTimeSince } from '../util';

export const PostComment = ({ comment, showModActions, onDelete }) => (
	<div className="commentContainer">
		<div className="comment">
			<VoteArrows votable={comment} />
			<div className="listing">
				<span className="poster">
					<Link to={"/u/" + comment.poster_name}>
						/u/{comment.poster_name}
					</Link>
				</span>
				<span className="time">{friendlyTimeSince(comment.created_at)}</span>

				{showModActions ? 
					<span className="delete" onClick={() => onDelete(comment)}>
						Delete
					</span>
					: ''}

				<p className="content" dangerouslySetInnerHTML={{__html: sanitize(comment.content)}}></p>
			</div>
		</div>
		<div className="children">
			{comment.children.map(x =>
				<PostComment key={x.id} comment={x} showModActions={showModActions} onDelete={onDelete} />
			)}
		</div>
	</div>
);

export default observer(({ comments, showModActions, onDelete }) => (
	<PaginationWrapper pagable={comments} className="rootCommentsContainer">
		{comments.currentPage.map(x => 
			<PostComment key={x.id} comment={x} showModActions={showModActions} onDelete={onDelete} />
		)}
	</PaginationWrapper>
));