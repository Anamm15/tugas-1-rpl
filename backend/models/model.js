import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const Account = db.define("account", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('Employee', 'Passenger'),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export const Employee = db.define("employee", {
    employee_number: {
        type: DataTypes.CHAR(8),
        allowNull: false,
    },
    position: {
        type: DataTypes.ENUM('Ground Staff', 'Security', 'Air Traffic Controller', 'Baggage Handler', 'Technician', 'Other'),
        allowNull: false,
    }
});

export const Passenger = db.define("passenger", {
    identity: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    passport: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
});

export const Airline = db.define("airline", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.CHAR(3),
        allowNull: false,
    } 
});

export const Aircraft = db.define("aircraft", {
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export const Flight = db.define("flight", {
    flight_code: {
        type: DataTypes.CHAR(6),
        allowNull: false,
    },
    arrival_airport: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    arrival_time: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

export const Ticket = db.define("ticket", {
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    class: {
        type: DataTypes.ENUM('Business', 'Economy', 'Premium Economy', 'First Class'),
        allowNull: false,
    },
    sold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    baggage: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

export const Booking = db.define("booking", {
   seat: {
       type: DataTypes.STRING(4),
       allowNull: false
   },
   booking_date: {
       type: DataTypes.DATE,
       allowNull: false
   },
   payment_method: {
       type: DataTypes.STRING,
       allowNull: false
   }
});

export const Departure = db.define('departure', {
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('On-Time', 'Delayed', 'Departed'),
        allowNull: false
    }
});

export const Arrival = db.define('arrival', {
    time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('On-Time', 'Delayed', 'Arrived'),
        allowNull: false
    }
});

Account.hasOne(Employee);
Employee.belongsTo(Account);

Account.hasOne(Passenger);
Passenger.belongsTo(Account);

Passenger.hasMany(Booking);
Booking.belongsTo(Passenger);

Ticket.hasMany(Booking);
Booking.belongsTo(Ticket);

Flight.hasMany(Ticket);
Ticket.belongsTo(Flight);

Airline.hasMany(Aircraft);
Aircraft.belongsTo(Airline);

Aircraft.hasMany(Flight);
Flight.belongsTo(Aircraft);

Flight.hasOne(Departure);
Departure.belongsTo(Flight);

Flight.hasOne(Arrival);
Arrival.belongsTo(Flight);