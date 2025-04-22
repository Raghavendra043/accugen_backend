// const {db} = require('./firebase')
const app = require('express')()
const path = require('path')

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors')
const bodyParser = require('body-parser')
const crypto = require('crypto')


const { privateKey } = JSON.parse(process.env.A_KEY);

var handlebars = require('handlebars');
var fs = require('fs');

const ejs = require('ejs')

const nodemailer = require("nodemailer")


var admin = require("firebase-admin");

// var serviceAccount = require("./accugen-2d0dc-firebase-adminsdk-fbsvc-e48f5a1f74.json");
const { getData, getDocDataOnCondition } = require('./Firebase/firestore')
const { getStyleDetails, number_to_word } = require('./Functions')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

admin.initializeApp({
	credential: admin.credential.cert({
	  client_email: process.env.CLIENT_EMAIL,
	  privateKey,
	  project_id: process.env.PROJECT_ID
	}),
	
  });

const db = admin.firestore()
const Auth = admin.auth();



const sampleData = {
	invoice: "564814684",
	date: "2024-10-09",
	name: "David",
	total: 8000,
	discount: 300,
	tax: 12,
	link: "xyz",
	netTotal: 0,
	products: [
	  {
		type: "Coat",
		des: "This is the description of the product",
		qty: 10,
		price: 2000,
		//   amount: 2000,
	  },
	  {
		type: "Vest Coat",
		des: "This is the description of the product",
		qty: 2,
		price: 1000,
		//   amount: 2000,
	  },
	  {
		type: "Pant",
		des: "This is the description of the product.This is the description of the product",
		qty: 1,
		price: 3000,
		//   amount: 3000,
	  },
	  {
		type: "Shirt",
		des: "This is the description of the product.This is the description of the product",
		qty: 1,
		price: 1000,
		//   amount: 1000,
	  },
	],
	devileryAddress: {
	  to: "David",
	  add1: "9127, Ashok Nagar",
	  add2: "Andhra Pradesh",
	},
	billingAddress: {
	  to: "Tom",
	  add1: "9127,wefwef Ashok Nagar",
	  add2: "Telangana",
	},
  };


app.use(cors())
app.use(bodyParser.json())






const getOrderDetails = async(orderID=null)=>{
	try{	
		const collection = db.collection("Orders");
		if(orderID){
			data = await getDocDataOnCondition(collection, "orderId", orderID)
		}else{
			data = await getData(collection);
		}
		
		return data;

	}catch(e){	

	}
}


app.post('/sendOtp', async(req, res)=>{
	try {
		const otp = req.body.otp;
		const email = req.body.email

		const __dirname = path.resolve();
		const filePath = path.join(__dirname, './views/OTP.html');
		const source = fs.readFileSync(filePath, 'utf-8').toString();
		const template = handlebars.compile(source);
		const replacements = {
			otp : otp,
		};
		const htmlToSend = template(replacements);

		const transporter = nodemailer.createTransport({    
			host: 'smtp.zoho.com',
			secure: true,
			secureConnection: false, // TLS requires secureConnection to be false
			tls: {
				ciphers:'SSLv3'
			},
			requireTLS:true,
			port: 465,
			debug: true,
			auth: {
				user: "orders@accugendental.com",
				pass: "BQ5MwjTwWYb3" 
			}
		});
		

		const mailOptions = {
			from: "orders@accugendental.com",
			to: email,
			subject: `Login at Accugen`,
			text: "OTP to login",
			html: htmlToSend
			// attachments: [{
			// 	filename: 'Invoice.pdf',
			// 	path: path.join(__dirname, "./", "Invoice.pdf")
			// }]
		  };

	 transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  console.error("Error sending email: ", error);
			  res.send({
				"status":1,
				"message": error
			  })
			} else {
			  console.log("Email sent: ", info.response);
			  res.send({
				"status":0,
				"message": info.response
			  })
			}
		  });
	} catch(e){
		console.log(e)
	}
})
app.post('/sendMail', async (req, res)=>{

	try{

		const email = req.body.email
		const name = req.body.name
		const orderId = req.body.id
		const product = req.body.product
		
		

		console.log( req.body )

		

		const __dirname = path.resolve();
		const filePath = path.join(__dirname, './views/order.html');
		const source = fs.readFileSync(filePath, 'utf-8').toString();
		const template = handlebars.compile(source);
		const replacements = {
			FirstName : name,
			OrderNumber : orderId,
			OrderDate : new Date().toString().slice(0, 15),
			TotalPrice : product,
			CompanyName : "Accugen"
		};
		const htmlToSend = template(replacements);

		// const transporter = nodemailer.createTransport({
		// 	service: "Gmail",
		// 	host: "smtp.gmail.com",
		// 	port: 465,
		// 	secure: true,
		// 	auth: {
		// 	  user: "orders@accugendental.com",
		// 	  pass: "nfiyyyobxisawqmf",
		// 	},
		// });

		const transporter = nodemailer.createTransport({    
			host: 'smtp.zoho.com',
			secure: true,
			secureConnection: false, // TLS requires secureConnection to be false
			tls: {
				ciphers:'SSLv3'
			},
			requireTLS:true,
			port: 465,
			debug: true,
			auth: {
				user: "orders@accugendental.com",
				pass: "BQ5MwjTwWYb3" 
			}
		});

		const mailOptions = {
			from: "orders@accugendental.com",
			to: email,
			subject: `Accugen Case Confirmation ${orderId}`,
			text: "Case Details",
			html: htmlToSend
		  };

	 transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  console.error("Error sending email: ", error);
			  res.send({
				"status":1,
				"message": error
			  })
			} else {
			  console.log("Email sent: ", info.response);
			  res.send({
				"status":0,
				"message": info.response
			  })
			}
		  });


	} catch(e){	
		console.log(e)
	}
})


app.post('/sendToAdmin', async(req, res)=>{
	try {
		const data = req.body;
		

		const link = `https://accugendental.com/approveaccount/${btoa(JSON.stringify(data))}`
 
		const transporter = nodemailer.createTransport({    
			host: 'smtp.zoho.com',
			secure: true,
			secureConnection: false, // TLS requires secureConnection to be false
			tls: {
				ciphers:'SSLv3'
			},
			requireTLS:true,
			port: 465,
			debug: true,
			auth: {
				user: "orders@accugendental.com",
				pass: "BQ5MwjTwWYb3" 
			}
		});

		const mailOptions = {
			from: "orders@accugendental.com",
			to: "admin@accugendental.com",
			cc : "raghavendra074743@gmail.com",
			subject: `Account Request for Accugendental.com`,
			text: "Account request",
			html: ` Hi Admin, <br>
			Account request for Accugendental.com is raised, below are the details, please verify the request. <br>
			Name : ${data.name} <br>
			Email : ${data.email} <br>
			Phone : ${data.phone}<br>
			${data.organizationType} name : ${data.organizationName} <br><br>

			Click on the link below and approve the request<br>
			<a href = "${link}">Approval link</a><br>
			
			`
			// attachments: [{
			// 	filename: 'Invoice.pdf',
			// 	path: path.join(__dirname, "./", "Invoice.pdf")
			// }]
		  };

	 transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  console.error("Error sending email: ", error);
			  res.send({
				"status":1,
				"message": error
			  })
			} else {
			  console.log("Email sent: ", info.response);
			  res.send({
				"status":0,
				"message": info.response
			  })
			}
		  });
	} catch(e){
		console.log(e)
	}
})

app.get('/', (req, res) => {
	res.send("Home")
})

app.post('/accountConfirmation', (req, res)=>{
	const email = req.body.email
	const name = req.body.name


	const transporter = nodemailer.createTransport({    
		host: 'smtp.zoho.com', 
		secure: true,
		secureConnection: false, // TLS requires secureConnection to be false
		tls: {
			ciphers:'SSLv3'
		},
		requireTLS:true,
		port: 465,
		debug: true,
		auth: {
			user: "orders@accugendental.com",
			pass: "BQ5MwjTwWYb3" 
		}
	});

	const mailOptions = {
		from: "orders@accugendental.com",
		to: email,
		subject: `Accugen Account Confirmation`,
		text: "Account request",
		html: ` Hi ${name}, <br><br>
		Account request for Accugendental.com is <b>approved</b>, You can login into the portal with your credentials. <br><br>
		Regards, <br>
		Accugen Team<br>
		Accugendental.com
		`
		// attachments: [{
		// 	filename: 'Invoice.pdf',
		// 	path: path.join(__dirname, "./", "Invoice.pdf")
		// }]
	  };

 transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		  console.error("Error sending email: ", error);
		  res.send({
			"status":1,
			"message": error
		  })
		} else {
		  console.log("Email sent: ", info.response);
		  res.send({
			"status":0,
			"message": info.response
		  })
		}
	  });
	
})

app.post('/customToken', async (req, res) => {
  try {
    const email = req.body.email;
	const password = req.body.password;
	const name  = req.body.name;

    console.log(email, password, name);

    var user = {
      uid: null,
      isPresent: false,
    };
    await Auth
      .getUserByEmail(email)
      .then((userRecord) => {
        user.uid = userRecord.toJSON().uid;
        user.isPresent = true;
      })
      .catch((error) => {
        console.log(error);
        user.isPresent = false;
      });

    console.log(user);
    if (user.isPresent) {
		throw new Error("Account with the email already exists");
    } else {
      await Auth
        .createUser({
          email: email,
          emailVerified: true,
          displayName: name,
		  password: password,
        })
        .then((userRecord) => {
          user.uid = userRecord.toJSON().uid;
          user.isPresent = true;
        })
        .catch((error) => {
          throw new Error(error.message);
        });

		
    	res.status(200).send({ message: "Account creation success" });
      
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

)


app.listen(1337, () => {
	console.log('Listening on 1337')
})


