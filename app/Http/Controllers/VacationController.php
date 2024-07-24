<?php

namespace App\Http\Controllers;

use App\Models\Vacation;
use Illuminate\Http\Request;

class VacationController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->query("user_name");
        $status = $request->query("status");

        $pagination = Vacation::whereHas("user", function ($query) use ($name) { // phpcs:ignore
            $query->where("name", "like", "%$name%");
        })
            ->when($status, function ($query, $status) {
                $query->where("status", $status);
            })
            ->with("user")
            ->orderBy("created_at", "desc")
            ->paginate($request->per_page)
            ->withQueryString();


        return inertia("Vacations/index", [
            "pagination" => $pagination,
        ]);
    }

    public function create(Request $request)
    {
        return inertia("Vacations/create");
    }

    public function show(int $id)
    {
        $vacation = Vacation::with("user")->findOrFail($id);
        return inertia("Vacations/show", [
            "vacation" => $vacation,
        ]);
    }

    public function userVacations(Request $request)
    {
        $status = $request->query("status");
        $pagination = Vacation::where("user_id", auth()->id())
            ->when($status, function ($query, $status) {
                $query->where("status", $status);
            })
            ->with("user")
            ->orderBy("created_at", "desc")
            ->paginate($request->per_page)
            ->withQueryString();
        return inertia("Vacations/user", [
            "pagination" => $pagination,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                "start_date" => ["required", "date"],
                "end_date" => ["required", "date"],
                "reason" => ["required", "string", "max:255"],
            ]);


            $vacation = new Vacation();
            $vacation->reason = $request->reason;
            $vacation->start_date = $request->start_date;
            $vacation->end_date = $request->end_date;
            $vacation->user_id = auth()->id();
            $vacation->save();


            $request->session()->flash("success", "Vacation created successfully");
            return redirect()->route("profile.vacations");
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $vacation = Vacation::findOrFail($id);
            if ($vacation->status !== "pending") {
                return redirect()->back()->with("error", "You can't update a vacation that is not pending");
            }

            $request->validate([
                "start_date" => ["required", "date"],
                "end_date" => ["required", "date"],
                "reason" => ["required", "string", "max:255"],
            ]);
            $vacation->reason = $request->reason;
            $vacation->start_date = $request->start_date;
            $vacation->end_date = $request->end_date;
            $vacation->save();


            $request->session()->flash("success", "Vacation updated successfully");
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function destroy(Request $request, $id)
    {
        try {
            $vacation = Vacation::findOrFail($id);
            $vacation->delete();
            $request->session()->flash("success", "Vacation deleted successfully");
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function approve(Request $request, int $id)
    {
        try {
            $vacation = Vacation::findOrFail($id);
            $vacation->status = "approved";
            $vacation->save();
            $request->session()->flash("success", "Vacation approved successfully");
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }

    public function reject(Request $request, int $id)
    {
        try {
            $vacation = Vacation::findOrFail($id);
            $vacation->status = "rejected";
            $vacation->save();
            $request->session()->flash("success", "Vacation rejected successfully");
            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }
}
