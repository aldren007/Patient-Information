<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'prefix' => fake()->randomElement(['Not Applicable','Miss','Mr',]),
            'last_name'=> fake()->lastname(),
            'first_name'=>fake()->firstname(),
            'middle_name'=>fake()->lastname(),
            'suffix'=>fake()->randomElement(['I','II','III','JR','SR']),
            'sex' => fake()->randomElement(['Male','Female']),
            'birth_date'=> fake()->date('Y-m-d'),
            'birth_place'=> fake()->country(),
            'civil_status'=>fake()->randomElement(['Annuled','Married','Single','Separated']),
            'educ_attainment'=>fake()->randomElement(['College','High School','Senior High','Undergraduate']),
            //'employment_status'=> fake()->randomElement(['Employed','Unemployed','Student','Unknown']),
            'religion' => fake()->randomElement(['Roman Catholic', 'Aglipay','Christian','Buddihism']),
            'indigenous'=> fake()->randomElement(['Yes','No']),
            'bloodtype'=> fake()->randomElement(['A+','B+','O+']),
            'phic_no' => fake()->randomNumber(8, true),
            
            'assigned_user_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
            'created_at' => now(),
            'updated_at' => now(),

        ]; 
    }
}
