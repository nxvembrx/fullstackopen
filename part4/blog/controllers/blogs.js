const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const blog = new Blog(body);
  const result = await blog.save();

  response.status(201).json(result);
});

module.exports = blogsRouter;
