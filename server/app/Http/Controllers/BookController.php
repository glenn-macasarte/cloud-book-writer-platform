<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('user')->get();
        return response()->json($books);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function store(BookRequest $request)
    {
        Book::create($request->validated());
        return response()->json(['message' => 'Book Created.'], 201);
    }

    public function update(BookRequest $request, Book $book)
    {
        $book->update($request->validated());
        return response()->json(['message' => 'Book Updated.'], 200);
    }

    public function destroy(Book $book)
    {        
        $book->delete();
        return response()->json(['message' => 'Book Deleted.'], 202);
    }
}