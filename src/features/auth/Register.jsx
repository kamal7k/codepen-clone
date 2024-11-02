import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "./userApi";
import * as Yup from 'yup';
import { toast } from "react-toastify";

const registerSchema = Yup.object({
  email: Yup.string().email().required(),
  fullname: Yup.string().required(),
  password: Yup.string().required(),
});

const Register = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const nav = useNavigate();



  const { values, errors, handleSubmit, handleChange, touched } = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await registerUser(val).unwrap();
        toast.success('successfully registered');
        nav(-1);
      } catch (err) {
        toast.error(err.data?.message);
      }
    },
    validationSchema: registerSchema
  });

  return (
    <div className="p-4 w-80 max-w-screen-lg sm:w-96">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          SignUp
        </Typography>

        <form className="mt-5 mb-2 " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">

            <Input
              name="fullname"
              onChange={handleChange}
              size="lg"
              value={values.fullname}

              label="Full Name"
            />
            {errors.fullname && touched.fullname && <h1 className='text-red-600'>{errors.fullname}</h1>}

            <Input
              name="email"
              onChange={handleChange}
              size="lg"
              value={values.email}
              placeholder="name@mail.com"
              label="Email"
            />
            {errors.email && touched.email && <h1 className='text-red-600'>{errors.email}</h1>}

            <Input
              type="password"
              size="lg"
              name="password"
              onChange={handleChange}
              value={values.password}
              placeholder="********"
              label="password"
            />

            {errors.password && touched.password && <h1 className='text-red-600'>{errors.password}</h1>}
          </div>

          <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
            SignUp
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account ?{" "}
            <button type="button" onClick={() => nav(-1)} className="font-medium text-gray-900">Login</button>

          </Typography>
        </form>
      </Card>
    </div>
  );
}


export default Register