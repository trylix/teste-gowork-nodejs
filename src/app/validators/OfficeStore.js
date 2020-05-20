import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('The name field is required.'),
      city: Yup.string().required('The city field is required.'),
      state: Yup.string().required('The state field is required.'),
      image: Yup.string().required('The image field is required.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'Field validation failed.', messages: err.inner });
  }
};
