import { TQueryParam, TResponseRedux } from "../../../types/global";
import { TStudent } from "../../../types/userManagement.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/students", method: "GET", params: params };
      },
      providesTags: ["student"],
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getStudentById: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      }),
      providesTags: ["student"],
      transformResponse: (response: TResponseRedux<TStudent>) => response.data,
    }),
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/admins", method: "GET", params: params };
      },
      // providesTags: ["admin"],
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    updateStudentById: builder.mutation({
      query: ({ studentId, ...patch }) => ({
        url: `/students/${studentId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["student"],
    }),
    deleteStudentById: builder.mutation({
      query: ({ studentId }) => ({
        url: `/students/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/faculties", method: "GET", params: params };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useGetAllFacultiesQuery,
  useAddFacultyMutation,
  useAddAdminMutation,
  useChangePasswordMutation,
  useUpdateStudentByIdMutation,
  useDeleteStudentByIdMutation,
  useGetAllAdminsQuery
} = userManagementApi;
