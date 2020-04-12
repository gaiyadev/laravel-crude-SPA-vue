<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use\App\Post;

class PostController extends Controller
{
    //
    public function store(Request $request) {
         $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
]);
          //posting
       $Post = new Post;
       $Post->title = $request->input('title');
       $Post->body = $request->input('body');
       $Post->save();

    }

 public function update(Request $request, $id)
    {
         $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
]);
         //update post
       $post =  Post::find($id);
       $post->title = $request->input('title');
       $post->body = $request->input('body');
       $post->save();

        return ['message' => 'Post updated'];
    }


    public function getPosts() {
        return Post::all();

    }

     public function destroy($id)
    {
        $post =  Post::find($id);
        $post->delete();
        return ['message' => 'Post Deleted'];

    }
}
