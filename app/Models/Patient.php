<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Patient extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $fillable = [
        'prefix', 
        'last_name',
        'first_name',
        'middle_name',
        'suffix',
        'sex',
        'birth_date',
        'birth_place',
        'civil_status',
        'educ_attainment',
        'religion',
        'indigenous',
        'blood_type',
        'phic_no',
        'assigned_user_id',
        'created_by',
        'updated_by',
    ];

    protected $appends = ['fullname'];

    protected $date = ['deleted_at'];

    public function casts(): array
    {
        return [
            'birth_date' => 'date',
        ];
    }

    public function birthDate(): Attribute 
    {
        return new Attribute(
            get: fn($value) => Carbon::parse($value)->format("Y-m-d"),
        );
    }

    public function getFullNameAttribute()
    {
        return "{$this->last_name}, {$this->first_name}, {$this->middle_name}";
    }

    public function scopeSearchByFullName(Builder $query, $name)
    {
        return $query->whereRaw("CONCAT(last_name, ', ', first_name, ' ', LEFT(middle_name, 1), '.') LIKE ?", ["%$name%"]);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class,'updated_by');
    }

}
