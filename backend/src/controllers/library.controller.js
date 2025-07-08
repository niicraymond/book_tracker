exports.getAllBooks = (req, res) => {
    res.json([])
}

exports.getBookById = (req, res) => {
    res.status(404).json({ msg: 'Not implemented yet' })
}

exports.createBook = (req,res) => {
    res.status(201).json({ msg: 'Not implemented yet' })
}

exports.updateBook = (req,res) => {
    res.status(200).json({ msg: 'Not implemented yet' })
}

exports.deleteBook = (req, res) => {
    res.status(204).end()
}