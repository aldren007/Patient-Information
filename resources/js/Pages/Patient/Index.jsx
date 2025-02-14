import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  ChevronUpIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { Construction } from "lucide-react";
import SuccessMessage from "@/Components/SuccessMessage";

export default function Index({ auth, patients, queryParams = null, success }) {
  queryParams = queryParams || {};
  //console.log(queryParams);
  const searchFieldChanged = (fullname, value) => {
    if (value) {
      queryParams[fullname] = value;
    } else {
      delete queryParams[fullname];
    }

    router.get(route("patient.index"), queryParams);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sortdirection = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("patient.index"), queryParams);
  };

  const onKeyPress = (fullname, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(fullname, e.target.value);
  };

  const patientDelete = (patient) => {
    if (!window.confirm("Are you sure you want to delete patient?")) {
      return;
    }
    router.delete(route("patient.destroy", patient.id));
  };

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Patient List
          </h2>
          <Link
            href={route("patient.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New Patient
          </Link>
        </div>
      }
    >
      <Head title="Patients" />

      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && <SuccessMessage message={success} duration={5000} />}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th onClick={(e) => sortChanged("last_name")}>
                        <div className="px-3 py-2 flex items-center gap-1">
                          PATIENT NAME<i>(Lastname, Firstname,Middle)</i>
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>

                      <th onClick={(e) => sortChanged("phic_no")}>
                        <div className="px-3 py-2 flex items-center justify-between gap-1">
                          PhilHealth No.
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th className="px-3 py-2">SEX</th>
                      <th onClick={(e) => sortChanged("birth_date")}>
                        <div className="px-3 py-2 flex items-center justify-between gap-1">
                          AGE
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th onClick={(e) => sortChanged("birth_date")}>
                        <div className="px-3 py-2 flex items-center justify-between gap-1">
                          BIRTHDAY
                          <div>
                            <ChevronUpIcon className="w-4" />
                            <ChevronDownIcon className="w-4 -mt-2" />
                          </div>
                        </div>
                      </th>
                      <th className="px-3 py-2 ">ACTION</th>
                    </tr>
                    <tr className="text-nowrap">
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.fullname}
                          placeholder="Patient Name"
                          onBlur={(e) =>
                            searchFieldChanged("fullname", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("fullname", e)}
                        />
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.sex}
                          onChange={(e) =>
                            searchFieldChanged("sex", e.target.value)
                          }
                        >
                          <option value="">Select Input</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2 "></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients?.data?.map((patient) => {
                      const calculateAge = (dob) => {
                        if (!dob) return "N/A"; // Handle cases where birth_date is missing
                        const birthDate = new Date(dob);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff =
                          today.getMonth() - birthDate.getMonth();

                        if (
                          monthDiff < 0 ||
                          (monthDiff === 0 &&
                            today.getDate() < birthDate.getDate())
                        ) {
                          age--;
                        }

                        return age;
                      };

                      return (
                        <tr
                          key={patient.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-3 py-2 font-semibold">
                            {patient.fullname}
                          </td>
                          <td className="px-3 py-2">{patient.phic_no}</td>
                          <td className="px-3 py-2">{patient.sex}</td>
                          <td className="px-3 py-2">
                            {calculateAge(patient.birth_date)}
                          </td>
                          <td className="px-3 py-2">{patient.birth_date}</td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("patient.show", patient.id)}
                              className="font-medium text-emerald-600 dark:text-emerald-600 hover:underline mx-1"
                            >
                              View
                            </Link>
                            <Link
                              href={route("patient.edit", patient.id)}
                              className="font-medium text-blue-600 dark:text-blue-600 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => patientDelete(patient)}
                              href={route("patient.destroy", patient.id)}
                              className="font-medium text-red-600 dark:text-red-600 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    }) || (
                      <tr>
                        <td colSpan="7" className="text-center py-2">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination links={patients.links} />
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
