import {
  TAcademicDepartment,
  TAcademicFaculty,
} from "../../../types/academicManajment.types";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/academic-semesters", method: "GET", params: params };
      },
      transformResponse: (response: any) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),

    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/academic-departments", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getAcademicDepartmentById: builder.query({
      query: (departmentId) => ({
        url: `/academic-departments/${departmentId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicDepartment>) =>
        response.data,
    }),
    updateAcademicDepartmentById: builder.mutation({
      query: ({ departmentId, ...patch }) => ({
        url: `/academic-departments/${departmentId}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/academic-faculties", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getFacultyById: builder.query({
      query: (facultyId) => ({
        url: `/academic-faculties/${facultyId}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<TAcademicFaculty>) =>
        response.data,
    }),
  }),
});

export const {
  useGetAllSemestersQuery,
  useCreateAcademicSemesterMutation,
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentsQuery,
  useCreateAcademicFacultyMutation,
  useGetAllFacultyQuery,
  useGetFacultyByIdQuery,
  useGetAllAcademicDepartmentQuery,
  useGetAcademicDepartmentByIdQuery,
  useUpdateAcademicDepartmentByIdMutation,
} = academicManagementApi;
