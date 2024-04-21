const pool = require('../db');

const getAllActions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const totalRecords = await getTotalRecords();

    const totalPages = Math.ceil(totalRecords / limit);

    const sql = "SELECT * FROM action LIMIT ?, ?";
    const [result] = await pool.query(sql, [offset, parseInt(limit)]);

    res.status(200).json({ totalPages, actionData: result });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getTotalRecords = async () => {
  const [result] = await pool.query("SELECT COUNT(*) as totalRecords FROM action");
  return result[0].totalRecords;
};

const searchActions = async (req, res) => {
  const { option, keyword, page = 1, limit = 10 } = req.query;
  let sql = "";
  let params = [];

  try {
    // Build the query based on the option (device or action) and keyword
    switch (option) {
      case 'device':
        sql = "SELECT * FROM action WHERE device LIKE ?";
        break;
      case 'action':
        sql = "SELECT * FROM action WHERE mode LIKE ?";
        break;
      default:
        return res.status(400).json({ message: "Invalid option" });
    }

    // Add the keyword to the parameter array
    params.push(`%${keyword}%`);

    // Execute the query to get the search result
    const [result] = await pool.query(sql, params);

    // Calculate the total number of records
    const totalRecords = result.length;

    // Calculate the number of pages and get data for the current page
    const totalPages = Math.ceil(totalRecords / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalRecords);
    const actionData = result.slice(startIndex, endIndex);

    // Return the search result and pagination information
    res.status(200).json({ totalPages, actionData });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};



// const getTotalSearchRecords = async (type, keyword) => {
//   try {
//     let sql = '';
//     let params = [];

//     switch (type) {
//       case 'temperature':
//         sql = 'SELECT COUNT(*) AS totalSearchRecords FROM action WHERE device LIKE ?';
//         break;
//       case 'humidity':
//         sql = 'SELECT COUNT(*) AS totalSearchRecords FROM sensor WHERE mode LIKE ?';
//         break;
//       default:
//         throw new Error('Invalid type.');
//     }

//     // Execute query
//     const [result] = await pool.query(sql, [keyword]);
    
//     return result[0].totalSearchRecords;
//   } catch (error) {
//     throw new Error('Error executing MySQL query in getTotalSearchRecords:', error);
//   }
// };

// const searchActions = async (req, res) => {

 

//   try {
//     const { type, keyword, page = 1, limit = 10 } = req.query;

//     page = parseInt(page);

//     limit = parseInt(limit);

//     const offset = (page - 1) * limit;

//     if (!type || !keyword) {
//       return res.status(400).json({ message: 'Missing required parameters.' });
//     }

//     let sql = "";
//     let params = [keyword];

//     const totalSearchRecords = await getTotalSearchRecords(type, keyword);

//     if (totalSearchRecords === 0) {
//       return res.status(404).json({ message: 'No sensors found.' });
//     }

//     const totalSearchPages = Math.ceil(totalSearchRecords / limit);

//     if (option === 'device') {
//       sql = "SELECT * FROM action WHERE device LIKE ?";
//     } else if (option === 'action') {
//       sql = "SELECT * FROM action WHERE mode LIKE ?";
//     } else {
//       return res.status(400).json({ message: "Invalid option" });
//     }

//     // Thêm từ khóa vào mảng tham số
//     params.push(`%${keyword}%`);

//     // Thực hiện truy vấn để lấy kết quả tìm kiếm
//     const [result] = await pool.query(sql, params);

//     // Tính toán tổng số bản ghi
//     const totalRecords = result.length;

//     // Tính toán số trang và lấy dữ liệu cho trang hiện tại
//     const totalPages = Math.ceil(totalRecords / limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = Math.min(startIndex + limit, totalRecords);
//     const actionData = result.slice(startIndex, endIndex);

//     // Trả về kết quả tìm kiếm và thông tin về phân trang
//     res.status(200).json({ totalPages, actionData });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };



// const searchActions = async (req, res) => {
//   const { option, keyword, page = 1, limit = 10 } = req.query;
//   let sql = "";
//   let params = [];

//   try {
//     // Xây dựng câu truy vấn dựa trên lựa chọn và từ khóa
//     if (option === 'device') {
//       sql = "SELECT * FROM action WHERE device LIKE ?";
//     } else if (option === 'action') {
//       sql = "SELECT * FROM action WHERE mode LIKE ?";
//     } else {
//       return res.status(400).json({ message: "Invalid option" });
//     }

//     // Thêm từ khóa vào mảng tham số
//     params.push(`%${keyword}%`);

//     // Thực hiện truy vấn để lấy kết quả tìm kiếm
//     const [result] = await pool.query(sql, params);

//     // Tính toán tổng số bản ghi
//     const totalRecords = result.length;

//     // Tính toán số trang và lấy dữ liệu cho trang hiện tại
//     const totalPages = Math.ceil(totalRecords / limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = Math.min(startIndex + limit, totalRecords);
//     const actionData = result.slice(startIndex, endIndex);

//     // Trả về kết quả tìm kiếm và thông tin về phân trang
//     res.status(200).json({ totalPages, actionData });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };


// const searchActions = async (req, res) => {
//   const { option, keyword } = req.query; // Sử dụng req.query thay vì req.body vì chúng ta đang truyền dữ liệu qua URL
//   let sql = "";

//   try {
//     // Xây dựng câu truy vấn dựa trên lựa chọn và từ khóa
//     if (option === 'device') {
//       sql = `SELECT * FROM action WHERE device LIKE '%${keyword}%'`;
//     } else if (option === 'action') {
//       sql = `SELECT * FROM action WHERE mode LIKE '%${keyword}%'`;
//     } else {
//       return res.status(400).json({ message: "Invalid option" });
//     }

//     const [result] = await pool.query(sql);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };



// const searchActions = async (req, res) => {
//   try {
//     const { device, action, searchTerm } = req.body;
//     const searchQuery = `
//       SELECT * FROM action
//       WHERE device LIKE '%${device}%' AND mode LIKE '%${action}%' AND (device LIKE '%${searchTerm}%' OR action LIKE '%${searchTerm}%')
//     `;

//     const [result] = await pool.query(searchQuery);

//     res.status(200).json({ actionData: result });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

const handleSortingAsc = async (req, res) => {
  try {
    const numberOfQueries = req.query.number || 1;
    const type = req.query.type;
    const sortType = req.query.sortType;
    const itemsPerQuery = 60;
    let allResults = [];
    const offset = (numberOfQueries - 1) * itemsPerQuery;
    let orderByClause = '';
    if (type === 'datetime') {
      orderByClause = `ORDER BY STR_TO_DATE(datetime, "%d/%m/%Y %H:%i:%s") ${sortType}`;
    } else {
      orderByClause = `ORDER BY ${type} ${sortType}`;
    }
    const query = `SELECT * FROM action ${orderByClause} LIMIT ${offset}, ${itemsPerQuery}`;
    const [results] = await pool.query(query);
    const chunkedResults = [];
    for (let j = 0; j < results.length; j += 12) {
      const chunk = results.slice(j, j + 12);
      chunkedResults.push(chunk);
    }

    allResults = allResults.concat(chunkedResults);

    res.status(200).json(allResults);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const handleSortingChosenOne = async (req, res) => {
  try {
    const numberOfQueries = req.query.number || 1;
    const type = req.query.type;
    const action = req.query.action;
    const itemsPerQuery = 60;
    let allResults = [];
    const offset = (numberOfQueries - 1) * itemsPerQuery;
    const query = `SELECT * FROM action WHERE ${type} = ${action} LIMIT ${offset}, ${itemsPerQuery}`;
    const [results] = await pool.query(query);
    const chunkedResults = [];
    for (let j = 0; j < results.length; j += 12) {
      const chunk = results.slice(j, j + 12);
      chunkedResults.push(chunk);
    }

    allResults = allResults.concat(chunkedResults);

    res.status(200).json(allResults);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const insertAction = async (req, res) => {
  try {
    const { device, mode, datetime } = req.body;
    const query = 'INSERT INTO action (device, mode, datetime) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [device, mode, datetime]);
    res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllActions,
  insertAction,
  handleSortingAsc,
  searchActions,
  handleSortingChosenOne
};

