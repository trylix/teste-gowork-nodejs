import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required('The email field is required.'),
      password: Yup.string().required('The password field is required.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Field validation failed.', messages: err.inner });
  }
};
