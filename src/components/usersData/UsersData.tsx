"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { getUsers, getUsersData } from "@/app/dashboard/userdata/page";

// type User = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   state: string;
// };
// const fakeData: User[] = [
//   {
//     id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@example.com",
//     state: "NY",
//   },
//   {
//     id: "2",
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane.doe@example.com",
//     state: "CA",
//   },
// ];
// const usStates: string[] = [
//   "Alabama",
//   "Alaska",
//   "Arizona",
//   "Arkansas",
//   "California",
// ];

//my data below

type Person = {
  _id:string;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  address: string;
  city: string;
};

const UserData = ({ users }: any) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [data, setData] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data.length) {
          setIsLoading(true);
        } else {
          setIsRefetching(true);
        }
        const url = getUsersData();
        url.searchParams.set(
          "start",
          `${pagination.pageIndex * pagination.pageSize}`
        );
        url.searchParams.set("size", `${pagination.pageSize}`);
        url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
        url.searchParams.set("globalFilter", globalFilter ?? "");
        url.searchParams.set("sorting", JSON.stringify(sorting ?? []));

        //console.log("11111111111111111 API Request URL:", url.href); // Log API request URL

        const newResponse = await getUsers(
          url.searchParams.get("start"),
          url.searchParams.get("size")
        );
        const filterUser: any = newResponse.filter(
          (e: any) => e.role === "User"
        );
        //console.log(newResponse, "testing");

        const response = await fetch(url.href);
        //console.log(url.searchParams.get("size"), "belowwww");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        //console.log("222222222222222222222 API Response:", json); // Log API response

        setData(filterUser);
        setRowCount(filterUser.length);
        setIsError(false);
        setIsLoading(false);
        setIsRefetching(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        setIsRefetching(false);
        console.error("API Request Error:", error); // Log API request error
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
  ]);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "_id",
        header: "Id",
        enableEditing:false,
      },
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
          //optionally add validation checking for onBlur or onChange
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: {
          type: "email",
          required: true,
          error: !!validationErrors?.email,
          helperText: validationErrors?.email,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              email: undefined,
            }),
        },
      },

      {
        accessorKey: "address",
        header: "Address",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.address,
          helperText: validationErrors?.address,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              address: undefined,
            }),
        },
      },
      {
        accessorKey: "city",
        header: "City",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.city,
          helperText: validationErrors?.city,
          //remove any previous validation errors when user focuses on the input
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              city: undefined,
            }),
        },
      },
    ],
    [validationErrors]
  );

  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers(users);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  //CREATE action
  const handleCreateUser: MRT_TableOptions<Person>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createUser(values);
      table.setCreatingRow(null); //exit creating mode
    };

  //UPDATE action
  const handleSaveUser: MRT_TableOptions<Person>["onEditingRowSave"] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<any>) => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      deleteUser(row.original.email);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    manualFiltering: true,
    manualSorting: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.grey[200],
      }),
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    // createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    // editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.email,
    manualPagination: false,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "300px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }: any) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Link href={"/dashboard/addUser"}>
        <Button variant="outlined">Create New User</Button>
      </Link>
    ),
  });

  return <MaterialReactTable table={table} />;
};

//my data above

//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Person) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: async (newUserInfo: Person) => {
      queryClient.setQueryData(
        ["users"],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
            },
          ] as Person[]
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//READ hook (get users from api)
function useGetUsers(users: any) {
  return useQuery<Person[]>({
    queryKey: ["users"],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(users);
    },
    refetchOnWindowFocus: false,
  });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: Person) => {
      const response = await fetch("../api/updateUserApi", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo: Person) => {
      console.log(newUserInfo)
      queryClient.setQueryData(["users"], (prevUsers: any) =>
        prevUsers?.map((prevUser: Person) =>
          prevUser._id === newUserInfo._id ? newUserInfo : prevUser
        )
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: string) => {
      const response = await fetch("../api/deleteUserApi", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    // onMutate: (email: string) => {
    //   queryClient.setQueryData(['users'], (prevUsers: any) =>
    //     prevUsers?.filter((user: Person) => {
    //       console.log(user)
    //       return user.email !== email}),
    //   )
    // },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}

const queryClient = new QueryClient();

const ExampleWithProviders = ({ users }: any) => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <UserData users={users} />
  </QueryClientProvider>
);
export default ExampleWithProviders;

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user: Person) {
  return {
    name: !validateRequired(user.name) ? "Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    address: !validateRequired(user.address) ? "Address is Required" : "",
    city: !validateRequired(user.city) ? "City is Required" : "",
  };
}
