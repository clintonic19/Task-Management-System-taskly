import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //DASHBOARD STATISTICS
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASKS_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),

    //GET ALL TASKS
    getTasks: builder.query({
      query: ({ strQuery, isTrashed, search }) =>({
        url:  `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // ADD TASK FORM / CREATE TASK
    createTask: builder.mutation({
      query: (data) =>({
        url:  `${TASKS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // DUPLICATE TASK FORM 
    duplicateTask: builder.mutation({
      query: (id) =>({
        url:  `${TASKS_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),

    //UPDATE TASK
    updateTask: builder.mutation({
      query: (data) =>({
        url:  `${TASKS_URL}/update/${data._id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    //DELETE TASK
    trashTask: builder.mutation({
      query: ({ id }) =>({
        url:  `${TASKS_URL}/${id}`,
        method: "PUT",
        // body: data,
        credentials: "include",
      }),
    }),

    // CREATE SUB TASK
    createSubTask: builder.mutation({
      query: ({ data,  id }) =>({
        url:  `${TASKS_URL}/create-subTask/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // GET SINGLE TASK
    singleTask: builder.query({
      query: ({id}) =>({
        url:  `${TASKS_URL}/${id}`,
        method: "GET",
        // body: data,
        credentials: "include",
      }),
    }),

    //  GET ALL ACTIVITIES
    taskactivity: builder.mutation({
      query: ({ data,  id }) =>({
        url:  `${TASKS_URL}/activity/${id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // DELETE AND RESTORE TASK
    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) =>({
        url:  `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),


  }),
});

export const { 
  useGetDashboardStatsQuery, 
  useGetTasksQuery, 
  useCreateTaskMutation, 
  useDuplicateTaskMutation, 
  useUpdateTaskMutation, 
  useTrashTaskMutation, 
  useCreateSubTaskMutation, 
  useSingleTaskQuery,
  useTaskactivityMutation,
  useDeleteRestoreTaskMutation,
} = taskApiSlice;
