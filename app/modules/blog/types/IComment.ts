export interface Reply {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    likes: number;
    timestamp: string;
    liked: boolean;
}

export interface Comment {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    likes: number;
    replies: Reply[];
    timestamp: string;
    liked: boolean;
    showReplies: boolean;
    replyText: string;
}

export interface CommentItemProps {
    comment: Comment;
    onLike: (commentId: number, replyId?: number) => void;
    onReply: (commentId: number, replyText: string) => void;
    onToggleReplies: (commentId: number) => void;
    replyingTo: number | null;
    setReplyingTo: (id: number | null) => void;
}
