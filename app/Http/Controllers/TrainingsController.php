<?php

namespace App\Http\Controllers;

use App\Models\Trainings;
use App\Models\User;
use Illuminate\Http\Request;

class TrainingsController extends Controller
{

    public function index(Request $request)
    {
        $name = $request->query('name');
        $year = $request->query('year');
        $pagination = Trainings::withCount('users')
            ->where('name', 'like', "%$name%")
            ->when($year, function ($query, $year) {
                $query->whereDate('year', $year);
            })
            ->orderBy('year', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Trainings/index', [
            'pagination' => $pagination,
        ]);
    }

    public function show(Request $request, int $id)
    {
        $name = $request->query('name');

        $training = Trainings::findOrFail($id);
        $users = $training->users()
            ->where('name', 'like', "%$name%")
            ->with('employee')
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Trainings/show', [
            'training' => $training,
            'users' => $users,
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
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'year' => 'required|digits:4',
                'description' => 'nullable|string',
            ]);
            $training = new Trainings();

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

    public function userTrainings(Request $request)
    {
        $user_id = $request->user()->id;

        $pagination = Trainings::when($user_id, function ($query) use ($user_id) {
            $query->whereHas('users', function ($query) use ($user_id) {
                $query->where('users.id', $user_id);
            });
        })
            ->withCount('users')
            ->orderBy('year', 'desc')
            ->paginate(10)
            ->withQueryString();

        return inertia('Trainings/user', [
            'pagination' => $pagination,
        ]);
    }



    public function enrollUser(Request $request, int $id)
    {
        $training = Trainings::findOrFail($id);


        return inertia('Trainings/enroll', [
            'training' => $training
        ]);
    }


    public function update(Request $request, int $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'type' => 'required|string|max:255',
                'year' => 'required|digits:4',
                'description' => 'nullable|string',
            ]);

            $trainings = Trainings::findOrFail($id);

            $trainings->update($request->all());

            return redirect()->back()->with('success', 'Training updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(Request $request, int $id)
    {
        try {
            $trainings = Trainings::findOrFail($id);
            $trainings->delete();

            $request->session()->flash('success', 'Training deleted successfully');
            return redirect()->route('trainings.index');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function enroll(Request $request, int $id)
    {
        try {
            $training = Trainings::findOrFail($id);

            $request->validate([
                'username' => ['required', 'string', 'max:255', 'exists:users,username'],
            ]);

            $user = User::where('username', $request->username)->first();

            if ($training->hasUser($user)) {
                return redirect()->back()->with('error', 'User already enrolled');
            }

            $training->users()->attach($user);

            $request->session()->flash('success', 'User enrolled successfully');
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function unenroll(Request $request, int $training_id, int $user_id)
    {
        try {
            $training = Trainings::findOrFail($training_id);
            $user = User::findOrFail($user_id);

            if (!$training->hasUser($user)) {
                return redirect()->back()->with('error', 'User not enrolled');
            }

            $training->users()->detach($user->id);

            $request->session()->flash('success', 'User unenrolled successfully');
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
