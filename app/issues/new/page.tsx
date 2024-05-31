"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("title")}>
          {/* <TextField.Input placeholder="Title" {...register("title")} /> */}
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState, formState }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

// "use client";
// import { Button, TextField } from "@radix-ui/themes";
// import SimpleMDE from "react-simplemde-editor";
// import { useForm, Controller } from "react-hook-form";
// import "easymde/dist/easymde.min.css";

// interface IssueForm {
//   title: string;
//   description: string;
// }

// const NewIssuePage = () => {
//   const { register, control, handleSubmit } = useForm<IssueForm>();

//   return (
//     <form
//       className="max-w-xl space-y-3"
//       onSubmit={handleSubmit((data) => console.log(data))}
//     >
//       <TextField.Root placeholder="Title" {...register("title")}>
//         {/* <TextField.Input placeholder="Title" /> */}
//       </TextField.Root>
//       <Controller
//         name="description"
//         control={control}
//         render={(field) => <SimpleMDE placeholder="Description" {...field} />}
//       />

//       <Button>Submit New Issue</Button>
//     </form>
//   );
// };

// export default NewIssuePage;
