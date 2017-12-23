import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * public GetUsers() : Get all Users
     * @param req 
     * @param res 
     * @param next 
     */
    public GetUsers(req: Request, res: Response, next: NextFunction): void {
        User.find({})
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
     * public GetUser() : return a single User
     * @param req 
     * @param res 
     * @param next 
     */
    public GetUser(req: Request, res: Response, next: NextFunction): void {
        const username:string = req.params.username;
        User.find({username}).populate('posts','title content')
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
     * public CreateUser() : create a User 
     * @param req 
     * @param res 
     * @param next 
     */
    public CreateUser(req: Request, res: Response, next: NextFunction): void {
        
        const name:string = req.body.name;
        const username:string = req.body.username;
        const email:string = req.body.email;
        const password:string = req.body.password;
        const posts:string[] = req.body.posts;

        const user = new User({
            name,
            password,
            email,
            username,
            posts
        });
        user.save()
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
     * public UpdateUser() : Update a User
     * @param req 
     * @param res 
     * @param next 
     */
    public UpdateUser(req: Request, res: Response, next: NextFunction): void {
        const username:string = req.params.username;
        User.findOneAndUpdate({username},req.body)
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
     * public DeleteUser(): Delete a User
     * @param req 
     * @param res 
     * @param next 
     */
    public DeleteUser(req: Request, res: Response, next: NextFunction): void {
        const username:string = req.params.username;
        User.findOneAndRemove({username})
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
        this.router.get('/', this.GetUsers);
        this.router.post('/', this.CreateUser);        
        this.router.get('/:username',this.GetUser);
        this.router.put('/:username',this.UpdateUser);
        this.router.delete('/:username',this.DeleteUser);
    }
}

// export

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;