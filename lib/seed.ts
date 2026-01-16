import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.review.deleteMany();

  // Seed Menu Items
  const menuItems = [
    // Antipasti (Appetizers)
    {
      name: "Bruschetta al Pomodoro",
      nameIt: "Bruschetta al Pomodoro",
      description: "Toasted bread with fresh tomatoes, basil, and extra virgin olive oil",
      descriptionIt: "Pane tostato con pomodori freschi, basilico e olio extravergine di oliva",
      category: "appetizer",
      price: 12.99,
      image: "https://www.shutterstock.com/shutterstock/photos/2685621763/display_1500/stock-photo-bruschetta-al-pomodoro-place-the-tomatoes-in-a-medium-bowl-and-drizzle-with-olive-oil-add-the-2685621763.jpg",
      allergens: JSON.stringify(["gluten"]),
      vegan: true,
      glutenFree: false,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Caprese Salad",
      nameIt: "Insalata Caprese",
      description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
      descriptionIt: "Mozzarella fresca, pomodori e basilico con riduzione di aceto balsamico",
      category: "appetizer",
      price: 14.99,
      image: "https://media.istockphoto.com/id/1345888788/photo/caprese-salad.jpg?s=612x612&w=0&k=20&c=cvxuF6osxtSktuBP4tsHkb46547-HU9W-K8_rSq5UGY=",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Prosciutto e Melone",
      nameIt: "Prosciutto e Melone",
      description: "Thinly sliced prosciutto di Parma with sweet cantaloupe melon",
      descriptionIt: "Prosciutto di Parma affettato sottile con melone cantalupo dolce",
      category: "appetizer",
      price: 16.99,
      image: "https://media.istockphoto.com/id/475045278/photo/concept-of-italian-food.jpg?s=612x612&w=0&k=20&c=HMrSq5Y40hFe947eXsMsH3npA_5-3VlCZYL2a72QKmw=",
      allergens: JSON.stringify([]),
      vegan: false,
      glutenFree: true,
      vegetarian: false,
      featured: false,
    },
    {
      name: "Arancini Siciliani",
      nameIt: "Arancini Siciliani",
      description: "Crispy risotto balls filled with mozzarella and ragù, breaded and fried",
      descriptionIt: "Palline di risotto croccanti farcite con mozzarella e ragù, impanate e fritte",
      category: "appetizer",
      price: 15.99,
      image: "https://media.istockphoto.com/id/1629353391/photo/a-man-eating-arancini-italian-rice-ball-al-ragu-or-al-sugo-that-is-stuffed-with-meat-peas-and.jpg?s=612x612&w=0&k=20&c=uornjVIACWo15mpzCgDIhMCPPIvYnNJkUK3UFkMdWKU=",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: false,
      featured: false,
    },
    // Primi (First Courses / Pasta & Risotto)
    {
      name: "Spaghetti Carbonara",
      nameIt: "Spaghetti alla Carbonara",
      description: "Classic Roman pasta with eggs, pancetta, and pecorino cheese",
      descriptionIt: "Pasta romana classica con uova, pancetta e pecorino",
      category: "main",
      price: 24.99,
      image: "https://media.istockphoto.com/id/1581084025/photo/plate-with-spaghetti-carbonara-on-a-laid-table.jpg?s=612x612&w=0&k=20&c=8tKlSwoS2e0TE4N7Hb2wgQnCtnY89hHCQ2WytnWU1ug=",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: false,
      featured: true,
    },
    {
      name: "Risotto ai Funghi",
      nameIt: "Risotto ai Funghi Porcini",
      description: "Creamy Arborio rice with wild porcini mushrooms and parmesan",
      descriptionIt: "Riso Arborio cremoso con funghi porcini selvatici e parmigiano",
      category: "main",
      price: 22.99,
      image: "https://thumbs.dreamstime.com/b/risotto-ai-funghi-mushrooms-fresh-herbs-parmesan-cheese-65204386.jpg",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: true,
      featured: false,
    },
    {
      name: "Lasagna alla Bolognese",
      nameIt: "Lasagne alla Bolognese",
      description: "Layered pasta with rich meat ragù, béchamel, and parmesan cheese",
      descriptionIt: "Pasta a strati con ragù di carne ricco, besciamella e parmigiano",
      category: "main",
      price: 26.99,
      image: "https://media.istockphoto.com/id/505754880/photo/traditional-lasagna-made-with-minced-beef-bolognese-sauce.jpg?s=612x612&w=0&k=20&c=zHPmvdFIwa4xdj5tOeYKFGw1JMYDurlxc_7K0X7B0kk=",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: false,
      featured: false,
    },
    // Secondi (Main Courses / Meat & Fish)
    {
      name: "Osso Buco",
      nameIt: "Osso Buco alla Milanese",
      description: "Braised veal shanks with vegetables and white wine, served with risotto",
      descriptionIt: "Stinco di vitello brasato con verdure e vino bianco, servito con risotto",
      category: "main",
      price: 32.99,
      image: "https://media.istockphoto.com/id/1295765777/photo/stewed-veal-shank-meat-osso-buco-italian-ossobuco-steak-wooden-background-top-view-copy-space.jpg?s=612x612&w=0&k=20&c=uwxGjvMp_3A9eqvkJ0txNsAQ9w2mkqKqw6iWBLrc4dY=",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: false,
      featured: true,
    },
    {
      name: "Branzino al Forno",
      nameIt: "Branzino al Forno",
      description: "Mediterranean sea bass baked with lemon, herbs, and white wine",
      descriptionIt: "Branzino del Mediterraneo al forno con limone, erbe e vino bianco",
      category: "main",
      price: 28.99,
      image: "https://t4.ftcdn.net/jpg/06/20/45/75/360_F_620457556_vDoLiO5UfyTuydDSFm0q6mhJYxmOg1kq.jpg",
      allergens: JSON.stringify([]),
      vegan: false,
      glutenFree: true,
      vegetarian: false,
      featured: false,
    },
    {
      name: "Margherita Pizza",
      nameIt: "Pizza Margherita",
      description: "Classic Neapolitan pizza with tomato, mozzarella, and fresh basil",
      descriptionIt: "Pizza napoletana classica con pomodoro, mozzarella e basilico fresco",
      category: "main",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emElMjBtYXJnaGVyaXRhfGVufDB8fDB8fHww",
      allergens: JSON.stringify(["gluten", "dairy"]),
      vegan: false,
      glutenFree: false,
      vegetarian: true,
      featured: true,
    },
    // Dolci (Desserts)
    {
      name: "Tiramisu",
      nameIt: "Tiramisù",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      descriptionIt: "Dolce italiano classico con savoiardi al caffè e mascarpone",
      category: "dessert",
      price: 10.99,
      image: "https://media.istockphoto.com/id/1248489319/photo/tiramisu-cake-with-mint.jpg?s=612x612&w=0&k=20&c=bE6ntOpTO7S8T_Rr39cnNkV_252VUB8-vymkN9WsQRQ=",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Cannoli Siciliani",
      nameIt: "Cannoli Siciliani",
      description: "Crispy fried shells filled with sweet ricotta and chocolate chips",
      descriptionIt: "Gusci croccanti fritti farciti con ricotta dolce e gocce di cioccolato",
      category: "dessert",
      price: 12.99,
      image: "https://media.istockphoto.com/id/1319266483/photo/typical-italian-dessert-cannoli-from-sicily.jpg?s=612x612&w=0&k=20&c=C-hAezG3mvZfSXrEptYuBwdHdR3QAZZp6Wf1qTQ1utw=",
      allergens: JSON.stringify(["gluten", "dairy"]),
      vegan: false,
      glutenFree: false,
      vegetarian: true,
      featured: false,
    },
    {
      name: "Panna Cotta",
      nameIt: "Panna Cotta",
      description: "Silky vanilla custard with berry compote",
      descriptionIt: "Crema di vaniglia setosa con composta di frutti di bosco",
      category: "dessert",
      price: 9.99,
      image: "https://media.istockphoto.com/id/1255776846/photo/raspberry-panna-cotta-with-raspberry-jelly-italian-dessert-homemade-cuisine-copy-space.jpg?s=612x612&w=0&k=20&c=TU-mPAtTafCrWcxHrtAO-HjxMkcGgOoG5E6W5l9tJkg=",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: true,
      featured: false,
    },
    {
      name: "Chianti Classico",
      nameIt: "Chianti Classico",
      description: "Premium Italian red wine from Tuscany",
      descriptionIt: "Vino rosso italiano premium della Toscana",
      category: "drink",
      price: 45.99,
      image: "https://www.shutterstock.com/image-photo/close-assorted-chianti-classico-wine-600nw-2710893637.jpg",
      allergens: JSON.stringify([]),
      vegan: true,
      glutenFree: true,
      vegetarian: true,
      featured: false,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  // Seed Blog Posts
  const blogPosts = [
    {
      title: "The Art of Authentic Italian Cooking",
      titleIt: "L'arte della cucina italiana autentica",
      slug: "art-of-authentic-italian-cooking",
      excerpt: "Discover the secrets behind traditional Italian cuisine and why fresh ingredients matter.",
      excerptIt: "Scopri i segreti della cucina italiana tradizionale e perché gli ingredienti freschi contano.",
      content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
      contentIt: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
      category: "recipe",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Wine Pairing Guide for Italian Dishes",
      titleIt: "Guida all'abbinamento vino-piatti italiani",
      slug: "wine-pairing-guide-italian-dishes",
      excerpt: "Learn how to pair the perfect wine with your favorite Italian dishes.",
      excerptIt: "Impara ad abbinare il vino perfetto ai tuoi piatti italiani preferiti.",
      content: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
      contentIt: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      category: "recipe",
      published: true,
      publishedAt: new Date(),
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  // Seed Reviews
  const reviews = [
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      rating: 5,
      comment: "Absolutely amazing! The pasta was perfect and the service was exceptional.",
      source: "google",
      approved: true,
    },
    {
      name: "Michael Chen",
      email: "michael@example.com",
      rating: 5,
      comment: "Best Italian restaurant in town. The Osso Buco was incredible!",
      source: "yelp",
      approved: true,
    },
    {
      name: "Emily Rodriguez",
      email: "emily@example.com",
      rating: 4,
      comment: "Great atmosphere and delicious food. Will definitely come back!",
      source: "website",
      approved: true,
    },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
