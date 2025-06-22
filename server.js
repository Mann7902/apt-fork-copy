const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again after some time',
});

// Middleware
app.use(express.json());
app.use(express.static("."));
app.use(limiter);

// app.use((req, res, next) => {
//   const start = new Date();
//     const originalEnd = res.end;
//   res.end = function(...args) {
//     console.log(`${req.method} ${req.url} - ${res.statusCode} ${start.toISOString()}`);
//     originalEnd.apply(this, args);
//   };
  
//   next();
// });


// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || "iflsjflsdjlfjsdlY*&^*^(&iuhit879";

// Initialize SQLite Database
const db = new sqlite3.Database("apt_database.db");

// Create tables
// db.serialize(() => {
//   // Users table
//   db.run(`CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE NOT NULL,
//         password TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`);

//   // Blogs table
//   db.run(`CREATE TABLE IF NOT EXISTS blogs (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT NOT NULL,
//         description TEXT NOT NULL,
//         content TEXT NOT NULL,
//         image TEXT,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`);

//   // Testimonials table
//   db.run(`CREATE TABLE IF NOT EXISTS testimonials (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         description TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`);

//   // Contact messages table
//   db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         email TEXT NOT NULL,
//         message TEXT NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`);

//   // Create default admin user
//   const defaultPassword = bcrypt.hashSync('admin123', 10);
//   db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`,
//       ['admin', defaultPassword]);

//   // Insert default blogs
//   const defaultBlogs = [
//     {
//       title: "Understanding Fire Insurance Claims",
//       description: "A comprehensive guide to fire insurance claim processes and what to expect during assessment...",
//       content: `<p>Fire insurance claims can be complex and overwhelming for policyholders. Understanding the process and what to expect can help ensure a smoother claims experience and fair settlement.</p>

//         <h3>Immediate Steps After a Fire</h3>
//         <p>The first 24-48 hours after a fire are crucial. Contact your insurance company immediately to report the claim. Document the damage with photographs and videos, but only if it's safe to do so.</p>

//         <h3>The Assessment Process</h3>
//         <p>Once you file a claim, an insurance surveyor will be appointed to assess the damage. The surveyor will investigate the cause of the fire, evaluate the extent of damage, and determine the cost of repairs or replacement.</p>`,
//       image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format",
//     },
//     {
//       title: "Motor Insurance: Best Practices",
//       description: "Essential tips for motor insurance claims and how proper documentation can speed up the process...",
//       content: `<p>Motor insurance claims are among the most common types of insurance claims. Following best practices can help ensure your claim is processed quickly and fairly.</p>

//         <h3>At the Scene of an Accident</h3>
//         <p>Your actions immediately after an accident can significantly impact your insurance claim. Ensure everyone's safety first, then document the scene thoroughly.</p>

//         <h3>Essential Information to Collect</h3>
//         <p>Gather comprehensive information including driver's license details, insurance information, and contact details of all parties involved.</p>`,
//       image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&auto=format",
//     },
//     {
//       title: "Health Insurance Coverage Explained",
//       description: "Navigate the complexities of health insurance policies and maximize your coverage benefits...",
//       content: `<p>Health insurance can be confusing with its various terms, coverage limits, and exclusions. Understanding your policy details is essential for making informed healthcare decisions.</p>

//         <h3>Understanding Your Policy</h3>
//         <p>Review your policy document carefully to understand what treatments and procedures are covered. Pay attention to waiting periods, co-payment requirements, and network hospitals.</p>

//         <h3>Cashless vs Reimbursement Claims</h3>
//         <p>Learn the difference between cashless treatment at network hospitals and reimbursement claims for non-network providers. Each has its own process and documentation requirements.</p>`,
//       image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&auto=format",
//     },
//     {
//       title: "Life Insurance: Protecting Your Family's Future",
//       description: "Understanding life insurance policies and how to choose the right coverage for your family's needs...",
//       content: `<p>Life insurance provides financial security for your loved ones in case of an unexpected event. Choosing the right policy requires careful consideration of your family's needs and financial goals.</p>

//         <h3>Types of Life Insurance</h3>
//         <p>Term life insurance offers coverage for a specific period, while whole life insurance provides lifelong protection with an investment component. Each has distinct advantages depending on your situation.</p>

//         <h3>Determining Coverage Amount</h3>
//         <p>Calculate the appropriate coverage amount by considering your family's ongoing expenses, debts, and future financial goals such as children's education and retirement planning.</p>`,
//       image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop&auto=format",
//     },
//     {
//       title: "Property Insurance: Safeguarding Your Assets",
//       description: "Complete guide to property insurance coverage including home, contents, and commercial property protection...",
//       content: `<p>Property insurance protects your most valuable assets from various risks including natural disasters, theft, and accidental damage. Understanding your coverage options helps ensure adequate protection.</p>

//         <h3>Home Insurance Essentials</h3>
//         <p>Home insurance typically covers the structure of your home, personal belongings, and liability protection. Review your policy annually to ensure coverage keeps pace with property values.</p>

//         <h3>Additional Coverage Options</h3>
//         <p>Consider additional coverage for high-value items, natural disasters not covered in standard policies, and temporary living expenses if your home becomes uninhabitable.</p>`,
//       image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format",
//     },
//     {
//       title: "Travel Insurance: Your Safety Net Abroad",
//       description: "Essential travel insurance tips for domestic and international trips, covering medical emergencies and trip cancellations...",
//       content: `<p>Travel insurance provides crucial protection against unexpected events during your trips. From medical emergencies to trip cancellations, comprehensive coverage ensures peace of mind while traveling.</p>

//         <h3>Medical Coverage Abroad</h3>
//         <p>Medical treatment costs can be extremely high in foreign countries. Travel insurance covers emergency medical expenses, hospitalization, and medical evacuation if needed.</p>

//         <h3>Trip Cancellation Protection</h3>
//         <p>Trip cancellation coverage reimburses non-refundable expenses if you need to cancel or cut short your trip due to covered reasons such as illness, family emergencies, or natural disasters.</p>`,
//       image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&auto=format",
//     },
//   ];

//   defaultBlogs.forEach((blog) => {
//     db.run(
//       `INSERT OR IGNORE INTO blogs (title, description, content, image) VALUES (?, ?, ?, ?)`,
//       [blog.title, blog.description, blog.content, blog.image]
//     );
//   });

//   // Insert default testimonials
//   const defaultTestimonials = [
//     {
//       name: "John Smith",
//       description: "APT provided exceptional service during our fire claim assessment. Their thorough investigation and professional approach made the entire process smooth and transparent.",
//     },
//     {
//       name: "Sarah Johnson",
//       description: "The team's expertise in marine claims is outstanding. They handled our cargo damage assessment with precision and delivered results quickly.",
//     },
//     {
//       name: "Michael Chen",
//       description: "Outstanding motor insurance claim handling! APT's surveyors were professional, detailed, and helped us get a fair settlement for our vehicle damage.",
//     },
//     {
//       name: "Emily Rodriguez",
//       description: "Their health insurance claim assessment was incredibly thorough. The team explained every step of the process and ensured we received maximum coverage benefits.",
//     },
//   ];

//   defaultTestimonials.forEach((testimonial) => {
//     db.run(
//       `INSERT OR IGNORE INTO testimonials (name, description) VALUES (?, ?)`,
//       [testimonial.name, testimonial.description]
//     );
//   });
// });

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Blogs page route
app.get("/blogs", (req, res) => {
  res.sendFile(path.join(__dirname, "blogs.html"));
});

app.get("/blog/:id", (req, res) => {
  // same file for blog details, blogs are shown using javascript
  res.sendFile(path.join(__dirname, "index.html"));
});
// Login route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ success: true, token });
  });
});

// Contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  db.run(
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    function (err) {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      res.json({
        success: true,
        message: "Message sent successfully",
        id: this.lastID,
      });
    }
  );
});

// Get contact messages (admin only)
app.get("/api/contact", authenticateToken, (req, res) => {
  db.all(
    "SELECT * FROM contact_messages ORDER BY created_at DESC",
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }
      res.json(rows);
    }
  );
});

// Delete contact message (admin only)
app.delete("/api/contact/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM contact_messages WHERE id = ?", [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Message deleted successfully" });
  });
});

// Blog routes
app.get("/api/blogs", (req, res) => {
  db.all("SELECT * FROM blogs ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json(rows);
  });
});

app.get("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM blogs WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (!row) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json(row);
  });
});

app.post("/blogupdate", authenticateToken, (req, res) => {
  const { id, title, description, content, image } = req.body;

  if (id) {
    // Update existing blog
    db.run(
      "UPDATE blogs SET title = ?, description = ?, content = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [title, description, content, image, id],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "Blog updated successfully" });
      }
    );
  } else {
    // Create new blog
    db.run(
      "INSERT INTO blogs (title, description, content, image) VALUES (?, ?, ?, ?)",
      [title, description, content, image],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
        res.json({
          success: true,
          message: "Blog created successfully",
          id: this.lastID,
        });
      }
    );
  }
});

app.delete("/api/blogs/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM blogs WHERE id = ?", [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  });
});

// Testimonial routes
app.get("/api/testimonials", (req, res) => {
  db.all("SELECT * FROM testimonials ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json(rows);
  });
});

app.get("/api/testimonials/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM testimonials WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    if (!row) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }
    res.json(row);
  });
});

app.post("/testimonialupdate", authenticateToken, (req, res) => {
  const { id, name, description } = req.body;

  if (id) {
    // Update existing testimonial
    db.run(
      "UPDATE testimonials SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, description, id],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
        res.json({
          success: true,
          message: "Testimonial updated successfully",
        });
      }
    );
  } else {
    // Create new testimonial
    db.run(
      "INSERT INTO testimonials (name, description) VALUES (?, ?)",
      [name, description],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Database error" });
        }
        res.json({
          success: true,
          message: "Testimonial created successfully",
          id: this.lastID,
        });
      }
    );
  }
});

app.delete("/api/testimonials/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM testimonials WHERE id = ?", [id], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }
    res.json({ success: true, message: "Testimonial deleted successfully" });
  });
});

// History API fallback - Add this AFTER all your API routes
app.get("*", (req, res) => {
  // Don't interfere with API routes
  if (
    req.path.startsWith("/api/") ||
    req.path.startsWith("/login") ||
    req.path.startsWith("/blogupdate") ||
    req.path.startsWith("/testimonialupdate")
  ) {
    return res.status(404).json({ success: false, message: "Route not found" });
  }
  // For all other routes (blog/*, service/*), serve index.html
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin panel available at http://localhost:${PORT}/login`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Database connection closed.");
    process.exit(0);
  });
});
