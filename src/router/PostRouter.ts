import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';

class PostRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * public GetPosts() : Get all posts
     * @param req 
     * @param res 
     * @param next 
     */
    public GetPosts(req: Request, res: Response, next: NextFunction): void {
        Post.find({})
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch((error) => {
                const status = res.statusCode;
                res.json({
                    status,
                    error
                })
            })
    }
    /**
     * public GetPost() : return a single post
     * @param req 
     * @param res 
     * @param next 
     */
    public GetPost(req: Request, res: Response, next: NextFunction): void {
        const slug:string = req.params.slug;
        Post.find({slug})
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch((error) => {
                const status = res.statusCode;
                res.json({
                    status,
                    error
                })
            })
    }

    /**
     * public CreatePost() : create a post 
     * @param req 
     * @param res 
     * @param next 
     */
    public CreatePost(req: Request, res: Response, next: NextFunction): void {
        const title:string = req.body.title;
        const featuredImage:string = req.body.featuredImage;
        const content:string = req.body.content;
        const slug:string = req.body.slug;
        
        const post = new Post({
            title,
            slug,
            content,
            featuredImage
        });
        post.save()
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch((error) => {
                const status = res.statusCode;
                res.json({
                    status,
                    error
                })
            })
    }

    /**
     * public UpdatePost() : Update a post
     * @param req 
     * @param res 
     * @param next 
     */
    public UpdatePost(req: Request, res: Response, next: NextFunction): void {
        const slug:string = req.params.slug;
        Post.findOneAndUpdate({slug},req.body)
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch((error) => {
                const status = res.statusCode;
                res.json({
                    status,
                    error
                })
            })
    }

    /**
     * public DeletePost(): Delete a post
     * @param req 
     * @param res 
     * @param next 
     */
    public DeletePost(req: Request, res: Response, next: NextFunction): void {
        const slug:string = req.params.slug;
        Post.findOneAndRemove({slug})
            .then((data) => {
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch((error) => {
                const status = res.statusCode;
                res.json({
                    status,
                    error
                })
            })
    }

    public routes() {
        this.router.get('/', this.GetPosts);
        this.router.post('/', this.CreatePost);        
        this.router.get('/:slug',this.GetPost);
        this.router.put('/:slug',this.UpdatePost);
        this.router.delete('/:slug',this.DeletePost);
    }
}

// export

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;