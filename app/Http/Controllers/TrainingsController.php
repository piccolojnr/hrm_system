<?php

namespace App\Http\Controllers;

use App\Models\Trainings;
use App\Models\User;
use Illuminate\Http\Request;

class TrainingsController extends Controller
{

    public function index(Request $request)
    {
        $name = $request->query('user_name');
        $year = $request->query('year');
        $pagination = Trainings::whereHas('user', function ($query) use ($name) { // phpcs:ignore
            $query->where('name', 'like', "%{$name}%");
        })
            ->when($year, function ($query, $year) {
                $query->whereDate('year', $year);
            })
            ->with('user')
            ->orderBy('year', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Trainings/index', [
            'pagination' => $pagination,
        ]);
    }

    public function show(int $id)
    {
        $training = Trainings::with("user")->findOrFail($id);
        return inertia('Trainings/show', [
            'training' => $training,
        ]);
    }

    public function create(Request $request)
    {
        return inertia('Trainings/create');
    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                "username" => ['required', 'string', 'max:255', 'exists:users,username'],
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'year' => 'required|digits:4',
                'description' => 'nullable|string',
            ]);
            $training = new Trainings();

            $user = User::where('username', $request->username)->first();

            $training->user()->associate($user);

            $training->name = $request->name;
            $training->description = $request->description;
            $training->type = $request->type;
            $training->year = $request->year;

            $training->save();

            $request->session()->flash('success', 'Training created successfully');
            return redirect()->route("trainings.show", $training->id);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                "username" => ['required', 'string', 'max:255', 'exists:users,username'],
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'year' => 'required|digits:4',
                'description' => 'nullable|string',
            ]);

            $trainings = Trainings::findOrFail($id);

            $user = User::where('username', $request->username)->first();
            $request->merge(['user_id' => $user->id]);
            $trainings->update($request->all());

            return redirect()->back()->with('success', 'Training updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        try {
            $trainings = Trainings::findOrFail($id);
            $trainings->delete();

            return redirect()->route('trainings.index');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
