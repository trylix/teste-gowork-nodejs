import File from '../../models/File';

class FileController {
  async store(req, res) {
    const { filename: path } = req.file;

    const file = await File.create({
      path,
    });

    return res.json({
      path: file.path,
    });
  }
}

export default new FileController();
