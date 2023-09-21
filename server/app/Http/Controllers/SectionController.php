<?php

namespace App\Http\Controllers;

use App\Http\Requests\SectionRequest;
use App\Models\Book;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index(Book $book)
    {
        $sections = Section::where('book_id', $book->id)->where('parent_id', 0)->with('user')->get();
        return response()->json($sections);
    }

    public function show(Book $book, Section $section)
    {
        return response()->json($section);
    }

    public function store($book_id, SectionRequest $request)
    {
        $book = Book::find($book_id);
        if (!$book) {
            return response()->json(['message' => 'Book not found!'], 404);
        }

        Section::create($request->validated());
        return response()->json(['message' => 'Section Created.'], 201);
    }

    public function update($book_id, $section_id, SectionRequest $request)
    {
        $section = Section::find($section_id);
        if (!$section) {
            return response()->json(['message' => 'Section not found!'], 404);
        }

        $section->update($request->validated());
        return response()->json(['message' => 'Section Updated.'], 200);
    }

    public function destroy($book_id, $section_id)
    {
        $section = Section::find($section_id);
        if (!$section) {
            return response()->json(['message' => 'Section not found!'], 404);
        }

        $section->delete();
        return response()->json(['message' => 'Section Deleted.'], 202);
    }

    public function subsections(Book $book, Section $section)
    {
        $sections = Section::where('book_id', $book->id)->where('parent_id', $section->id)->with('user')->get();
        return response()->json($sections);
    }
}
