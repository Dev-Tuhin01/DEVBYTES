import { Router } from "express";
import { deleteComment, getComments, postComment } from "../Controller/comment.controller.ts";
import AuthMiddleWare from "../Middleware/auth.middleware.ts";

const miscRouter = Router()

miscRouter.post("/:blogId",AuthMiddleWare,postComment);
miscRouter.get("/:blogId",getComments);
miscRouter.delete("/:commentId/delete",AuthMiddleWare,deleteComment);

export default miscRouter;