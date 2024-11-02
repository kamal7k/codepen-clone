import { useFormik } from "formik";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import * as Yup from 'yup';
import { useUpdateProfileMutation } from "../auth/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../auth/userSlice";

const updateSchema = Yup.object({
  email: Yup.string().email().required(),
  fullname: Yup.string().required(),
});

const UserProfile = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();
  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      email: user?.email,
      fullname: user?.fullname
    },
    onSubmit: async (val) => {
      try {
        const newUser = { ...user, email: val.email, fullname: val.fullname };

        const response = await updateUser(newUser).unwrap();
        dispatch(addUser(newUser));
        toast.success('successfully updated');

      } catch (err) {
        toast.error(err.data?.message);
      }
    },
    validationSchema: updateSchema
  });
  return (
    <div className="p-4 w-80 max-w-screen-lg sm:w-96">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>

        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Input
              type="text"
              size="lg"
              name="fullname"
              onChange={handleChange}
              value={values.fullname}

              label="FullName"
            />

            {errors.fullname && touched.fullname && <h1 className='text-red-600'>{errors.fullname}</h1>}
            <Input
              name="email"
              onChange={handleChange}
              size="lg"
              value={values.email}
              label="Email"
              placeholder="name@mail.com"

            />
            {errors.email && touched.email && <h1 className='text-red-600'>{errors.email}</h1>}


          </div>

          <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
            Update
          </Button>

        </form>
      </Card>
    </div>
  )
}
export default UserProfile