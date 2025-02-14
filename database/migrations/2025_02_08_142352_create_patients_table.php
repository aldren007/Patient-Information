<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('prefix')->nullable();
            $table->string('last_name');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('suffix')->nullable();
            $table->string('sex');
            $table->date('birth_date');
            $table->string('birth_place')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('educ_attainment')->nullable();
            $table->string('religion')->nullable();
            $table->string('indigenous')->nullable();
            $table->string('bloodtype')->nullable();
            $table->string('phic_no');
            $table->foreignId('assigned_user_id')->constrained('users');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->softDeletes(); // Adds the deleted_at column
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
