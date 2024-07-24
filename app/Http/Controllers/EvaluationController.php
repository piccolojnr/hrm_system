<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use App\Models\User;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query('user_name');
        $year = $request->query('year');
        $pagination = Evaluation::whereHas('user', function ($query) use ($name) { // phpcs:ignore
            $query->where('name', 'like', "%{$name}%");
        })
            ->when($year, function ($query, $year) {
                $query->whereDate('year', $year);
            })
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Evaluations/index', [
            'pagination' => $pagination,
        ]);
    }

    public function create(Request $request)
    {
        return inertia('Evaluations/create');
    }

    public function show(Request $request, int $id)
    {
        $evaluation = Evaluation::with("user")->findOrFail($id);
        return inertia('Evaluations/show', [
            'evaluation' => $evaluation,
        ]);
    }

    public function userEvaluations(Request $request)
    {
        $pagination = Evaluation::where('user_id', auth()->id())
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();
        return inertia('Evaluations/user', [
            'pagination' => $pagination,
        ]);
    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                "username" => ['required', 'string', 'max:255', 'exists:users,username'],
                'value' => 'required|numeric|min:0|max:10',
                'notes' => 'nullable|string',
            ]);
            $evaluation = new Evaluation();

            $user = User::where('username', $request->username)->first();

            $evaluation->user()->associate($user);

            $evaluation->value = $request->value;
            $evaluation->notes = $request->notes;

            $evaluation->save();

            return redirect()->route('evaluations.index')->with('success', 'Evaluation created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                'value' => 'required|numeric|min:0|max:10',
                'notes' => 'nullable|string',
            ]);
            $evaluation = Evaluation::findOrFail($id);

            $evaluation->value = $request->value;
            $evaluation->notes = $request->notes;

            $evaluation->save();

            return redirect()->back()->with('success', 'Evaluation updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error updating evaluation');
        }
    }

    public function destroy(Request $request, int $id)
    {
        try {
            $evaluation = Evaluation::findOrFail($id);
            $evaluation->delete();
            return redirect()->route('evaluations.index')->with('success', 'Evaluation deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error deleting evaluation');
        }
    }
}
