import DateInput from "@/Components/DateInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";

export default function Edit({ auth, patient }) {
  console.log(patient);

  const { data, setData, put, errors, reset } = useForm({
    prefix: patient.data["prefix"] || "",
    last_name: patient.data["last_name"] || "",
    first_name: patient.data["first_name"] || "",
    middle_name: patient.data["middle_name"] || "",
    suffix: patient.data["suffix"] || "",
    sex: patient.data["sex"] || "",
    birth_date: patient.data["birth_date"] || "",
    birth_place: patient.data["birth_place"] || "",
    civil_status: patient.data["civil_status"] || "",
    educ_attainment: patient.data["educ_attainment"] || "",
    religion: patient.data["religion"] || "",
    indigenous: patient.data["indigenous"] || "",
    bloodtype: patient.data["bloodtype"] || "",
    phic_no: patient.data["phic_no"] || "",
  });
  console.log(data);

  //console.log(patient.last_name);

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("patient.update", patient.data["id"]));
  };

  const fixDateFormat = (dbDate) => {
    if (!dbDate) return ""; // Prevent errors

    // Replace incorrect characters (commas and dots) with hyphens
    let formattedDate = dbDate.replace(/,/g, "-").replace(/\./g, "-");

    // Convert to a valid Date object
    let dateObj = new Date(formattedDate);

    // Ensure it's a valid date
    if (isNaN(dateObj)) return "";

    return dateObj.toISOString().split("T")[0]; // Convert to "YYYY-MM-DD"
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Patient {patient.data["last_name"]},{" "}
            {patient.data["first_name"]}
          </h2>
        </div>
      }
    >
      <Head title="Add Patient" />
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mt-4">
                <InputLabel htmlFor="last_name" value="Prefix" />
                <SelectInput
                  id="prefix"
                  name="prefix"
                  value={data.prefix} // Ensure this matches the key in the state
                  className="mt-1 block w-full"
                  onChange={(e) => setData("prefix", e.target.value)} // Fix function name
                >
                  <option value="">Select Prefix</option>
                  <option value="Not Applicable">Not Applicable</option>
                  <option value="Miss">Miss</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                </SelectInput>

                <InputError message={errors.prefix} className="mt-2" />
              </div>
              <div className="mt-4 flex space-x-4">
                <div className="w-1/3">
                  <InputLabel htmlFor="last_name" value="Last Name" />
                  <TextInput
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={data.last_name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("last_name", e.target.value)}
                  />
                  <InputError message={errors.last_name} className="mt-2" />
                </div>
                <div className="w-1/3">
                  <InputLabel htmlFor="first_name" value="First Name" />
                  <TextInput
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={data.first_name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("first_name", e.target.value)}
                  />
                  <InputError message={errors.first_name} className="mt-2" />
                </div>
                <div className="w-1/3">
                  <InputLabel htmlFor="middle_name" value="Middle Name" />
                  <TextInput
                    id="middle_name"
                    type="text"
                    name="middle_name"
                    value={data.middle_name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("middle_name", e.target.value)}
                  />
                  <InputError message={errors.middle_name} className="mt-2" />
                </div>
                <div className="w-1/8">
                  <InputLabel htmlFor="suffix" value="Suffix" />
                  <SelectInput
                    id="suffix"
                    name="suffix"
                    value={data.suffix} // Ensure this matches the key in the state
                    className="mt-1 block w-full"
                    onChange={(e) => setData("suffix", e.target.value)} // Fix function name
                  >
                    <option value="">Select</option>
                    <option value="not_applicable">N/A</option>
                    <option value="sr">SR</option>
                    <option value="jr">JR</option>
                    <option value="i">I</option>
                    <option value="ii">II</option>
                    <option value="iii">III</option>
                  </SelectInput>
                  <InputError message={errors.suffix} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="sex" value="Sex" />
                <SelectInput
                  id="sex"
                  name="sex"
                  value={data.sex} // Ensure this matches the key in the state
                  className="mt-1 block w-full"
                  onChange={(e) => setData("sex", e.target.value)} // Fix function name
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </SelectInput>
                <InputError message={errors.sex} className="mt-2" />
              </div>

              <div className="mt-4 flex space-x-4">
                <div className="w-1/2">
                  <InputLabel htmlFor="birth_date" value="Birthdate" />
                  {/* <DateInput dbDate={data.birth_date} /> */}
                  <TextInput
                    id="birth_date"
                    type="date"
                    name="birth_date"
                    value={fixDateFormat(data.birth_date)}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("birth_date", e.target.value)}
                  />
                  <InputError message={errors.birth_date} className="mt-2" />
                </div>

                <div className="w-1/2">
                  <InputLabel htmlFor="birth_place" value="Birth Place" />
                  <TextInput
                    id="birth_place"
                    type="text"
                    name="birth_place"
                    value={data.birth_place}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("birth_place", e.target.value)}
                  />
                  <InputError message={errors.birth_place} className="mt-2" />
                </div>
              </div>

              <div className="mt-4 flex space-x-4">
                <div className="w-1/2">
                  <InputLabel htmlFor="civil_status" value="Civil Status" />
                  <SelectInput
                    id="civil_status"
                    name="civil_status"
                    value={data.civil_status} // Ensure this matches the key in the state
                    className="mt-1 block w-full"
                    onChange={(e) => setData("civil_status", e.target.value)} // Fix function name
                  >
                    <option value="">Select Civil Status</option>
                    <option value="Annulled">Annulled</option>
                    <option value="Married">Married</option>
                    <option value="Single">Single</option>
                    <option value="Separated">Separated</option>
                  </SelectInput>
                  <InputError message={errors.civil_status} className="mt-2" />
                </div>

                <div className="w-1/2">
                  <InputLabel htmlFor="religion" value="Religion" />
                  <SelectInput
                    id="religion"
                    name="religion"
                    value={data.religion} // Ensure this matches the key in the state
                    className="mt-1 block w-full"
                    onChange={(e) => setData("religion", e.target.value)} // Fix function name
                  >
                    <option value="">Select Religion</option>
                    <option value="Roman Catholic">Roman Catholic</option>
                    <option value="Aglipay">Aglipay</option>
                    <option value="Christian">Christian</option>
                    <option value="Buddihism">Buddihism</option>
                  </SelectInput>
                  <InputError message={errors.religion} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="educ_attainment"
                  value="Educational Attainment"
                />
                <SelectInput
                  id="educ_attainment"
                  name="educ_attainment"
                  value={data.educ_attainment} // Ensure this matches the key in the state
                  className="mt-1 block w-full"
                  onChange={(e) => setData("educ_attainment", e.target.value)} // Fix function name
                >
                  <option value="">Select Educational Attainment</option>
                  <option value="Elementary">Elementary</option>
                  <option value="High School">High School</option>
                  <option value="Senior High">Senior High</option>
                  <option value="College">College</option>
                  <option value="Undergraduate">Undergraduate</option>
                </SelectInput>
                <InputError message={errors.educ_attainment} className="mt-2" />
              </div>

              <div className="mt-4 flex space-x-4">
                <div className="w-1/2">
                  <InputLabel htmlFor="indigenous" value="Indigenous" />
                  <SelectInput
                    id="indigenous"
                    name="indigenous"
                    value={data.indigenous} // Ensure this matches the key in the state
                    className="mt-1 block w-full"
                    onChange={(e) => setData("indigenous", e.target.value)} // Fix function name
                  >
                    <option value="">Select Indigenous</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </SelectInput>
                  <InputError message={errors.indigenous} className="mt-2" />
                </div>

                <div className="w-1/2">
                  <InputLabel htmlFor="bloodtype" value="Blood Type" />
                  <SelectInput
                    id="bloodtype"
                    name="bloodtype"
                    value={data.bloodtype} // Ensure this matches the key in the state
                    className="mt-1 block w-full"
                    onChange={(e) => setData("bloodtype", e.target.value)} // Fix function name
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                  </SelectInput>
                  <InputError message={errors.bloodtype} className="mt-2" />
                </div>
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="phic_no" value="Philhealth No." />
                <TextInput
                  id="phic_no"
                  type="text"
                  name="phic_no"
                  value={data.phic_no}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("phic_no", e.target.value)}
                />
                <InputError message={errors.phic_no} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("patient.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rouded shadow transition-all hover:bg-emerald-600">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
