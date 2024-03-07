import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount, selectUserInfo, updateUserAsync,
} from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);

  console.log(userInfo)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser))
  };

  const handleEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue('name', address.name)
    setValue("email", address.email)
    setValue("city", address.city)
    setValue("state", address.state)
    setValue("pinCode", address.pinCode)
    setValue("phone", address.phone)
    setValue("street", address.street)
  }

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddressForm(false)
  }

  return (
    <div>
      <div className="mx-auto mt-12 ml-20 mr-20 mb-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-2xl my-5  font-bold tracking-tight text-gray-900">
            Name : {userInfo.name ? userInfo.name : "New User"}
          </h1>
          <h3 className="text-xl my-5  font-bold tracking-tight text-red-400">
            Email Address: {userInfo.email}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="text-xl my-5  font-bold tracking-tight text-red-400">
              Role: {userInfo.role}
            </h3>
          )}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <button
            onClick={(e) => {
              setShowAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            class="rounded-md my-5 bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button>
          {showAddressForm ? (
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
                reset();
              })}
            >
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                      <label
                        for="name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name  is required",
                          })}
                          id="name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email  is required",
                          })}
                          type="email"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="phone"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div class="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone  is required",
                          })}
                          type="tel"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-full">
                      <label
                        for="street-address"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street  is required",
                          })}
                          id="street"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                      <label
                        for="city"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city  is required",
                          })}
                          id="city"
                          autocomplete="address-level2"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="state"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state  is required",
                          })}
                          id="state"
                          autocomplete="address-level1"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="pinCode"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode  is required",
                          })}
                          id="pinCode"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex items-center justify-end gap-x-6 pb-5">
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
          <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
          {userInfo.addresses.map((address, index) => (
            <div key={index}>
              {selectedEditIndex === index ? (
                <form
                  className="bg-white px-5 py-12 mt-12"
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    handleEdit(data, index);
                    reset();
                  })}
                >
                  <div class="space-y-12">
                    <div class="border-b border-gray-900/10 pb-12">
                      <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p class="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                          <label
                            for="name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name  is required",
                              })}
                              id="name"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-4">
                          <label
                            for="email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div class="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email  is required",
                              })}
                              type="email"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-3">
                          <label
                            for="phone"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone
                          </label>
                          <div class="mt-2">
                            <input
                              id="phone"
                              {...register("phone", {
                                required: "phone  is required",
                              })}
                              type="tel"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="col-span-full">
                          <label
                            for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street  is required",
                              })}
                              id="street"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2 sm:col-start-1">
                          <label
                            for="city"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city  is required",
                              })}
                              id="city"
                              autocomplete="address-level2"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2">
                          <label
                            for="state"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "state  is required",
                              })}
                              id="state"
                              autocomplete="address-level1"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div class="sm:col-span-2">
                          <label
                            for="pinCode"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div class="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "pinCode  is required",
                              })}
                              id="pinCode"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6 pb-5">
                      <button
                        onClick={(e) => setSelectedEditIndex(-1)}
                        type="submit"
                        class="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
              <div
                className="flex justify-between gap-x-6 
                          px-5 py-5 border-solid border-2 border-gray-200"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {address.pinCode}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.city}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <button
                    onClick={(e) => handleEditForm(index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleRemove(e, index)}
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
