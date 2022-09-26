import { Input, Button } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useEnterMutation from "../hooks/mutations/useEnterMutation";
import useAuthStore from "../stores/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().min(1).required(),
});

export default () => {
  const enterMutation = useEnterMutation();

  const navigate = useNavigate();

  const { currentUser } = useAuthStore();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  const handleSubmit = async ({ name }) => {
    await enterMutation.mutateAsync(name);
  };

  return (
    <div className="pt-[30px]">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto max-w-[300px]"
      >
        <h2 className="text-center">Enter</h2>
        <Controller
          name="name"
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="Name"
              {...(form.formState.errors.name && { status: "error" })}
              {...field}
            />
          )}
        />
        <Button
          loading={enterMutation.isLoading}
          className="mt-[5px]"
          block
          type="primary"
          htmlType="submit"
        >
          Enter
        </Button>
      </form>
    </div>
  );
};
