import * as Yup from 'yup';

import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const StudentExists = await Students.findOne({
      where: { email: req.body.email, name: req.body.name },
    });

    if (StudentExists) {
      return res.status(400).json({ error: 'Student Already Exists' });
    }

    const { name, email } = await Students.create(req.body);

    return res.json({ name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, name } = req.body;

    const student = await Students.findOne({ where: { name } });

    if (!student) {
      return res.status(400).json({ error: 'student not found' });
    }

    if (email !== student.email) {
      const checkEmail = await Students.findOne({ where: { email } });

      if (checkEmail) {
        return res
          .status(400)
          .json({ error: 'Email already taken, please try another one' });
      }
    }

    const {
      name: name2,
      email: email2,
      idade,
      peso,
      altura,
    } = await student.update(req.body);

    return res.json({ name2, email2, idade, peso, altura });
  }
}

export default new StudentsController();
