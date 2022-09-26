import { List, Input, Button, AutoComplete, Typography, message } from "antd";
import useGetUsersQuery from "../hooks/queries/useGetUsersQuery";
import useGetMessagesQuery from "../hooks/queries/useGetMessagesQuery";
import useSendMessageMutation from "../hooks/mutations/useSendMessageMutation";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/auth";
import * as yup from "yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object({
  title: yup.string().min(1).required(),
  text: yup.string().min(1).required(),
  receiver: yup.string().required(),
});

export default () => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      text: "",
      receiver: "",
    },
  });

  useWatch({ control: form.control, name: "receiver" });

  const sendMessageMutation = useSendMessageMutation();

  const usersQuery = useGetUsersQuery();
  const getMessagesQuery = useGetMessagesQuery();

  const filteredUsers = usersQuery.data?.filter((u) =>
    u.includes(form.getValues("receiver"))
  );

  useEffect(() => {
    form.register("receiver");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getMessagesQuery.refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      usersQuery.refetch();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (data) => {
    await sendMessageMutation.mutateAsync(data);

    form.reset();
  };

  return (
    <div className="mt-[30px]">
      <div className="max-w-[400px] mx-auto">
        <form className="mt-[5px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <AutoComplete
            className="w-full"
            // {...form.register("receiver")}
            value={form.getValues("receiver")}
            onChange={(to) => form.setValue("receiver", to)}
            {...(form.formState.errors.receiver && { status: "error" })}
            onBlur={() => {
              if (
                usersQuery.data &&
                !usersQuery.data.includes(form.getValues("receiver"))
              ) {
                form.setValue("receiver", "");
              }
            }}
            placeholder="Receiver"
            options={
              filteredUsers
                ? filteredUsers.map((receiver) => ({
                    value: receiver,
                  }))
                : []
            }
          />
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input
                className="w-full"
                placeholder="Title"
                {...(form.formState.errors.title && { status: "error" })}
                {...field}
              />
            )}
          />
          <Controller
            name="text"
            control={form.control}
            render={({ field }) => (
              <Input.TextArea
                className="w-full"
                placeholder="Text"
                {...(form.formState.errors.text && { status: "error" })}
                {...field}
              />
            )}
          />
          <Button
            loading={sendMessageMutation.isLoading}
            htmlType="submit"
            type="primary"
            className="mt-[10px] w-full"
          >
            Send
          </Button>
        </form>
        <Typography.Title className="mt-[20px]" level={4}>
          Messages
        </Typography.Title>
        {getMessagesQuery.isLoading && <div className="">Loading</div>}
        {getMessagesQuery.data && (
          <List
            bordered
            itemLayout="horizontal"
            dataSource={getMessagesQuery.data.map((message) => message)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.sender} description={item.title} />
                {item.text}
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
};
