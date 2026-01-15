import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.review.deleteMany();

  // Seed Menu Items
  const menuItems = [
    {
      name: "Bruschetta al Pomodoro",
      nameIt: "Bruschetta al Pomodoro",
      description: "Toasted bread with fresh tomatoes, basil, and extra virgin olive oil",
      descriptionIt: "Pane tostato con pomodori freschi, basilico e olio extravergine di oliva",
      category: "appetizer",
      price: 12.99,
      image: "/images/bruschetta.jpg",
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
      image: "/images/caprese.jpg",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Spaghetti Carbonara",
      nameIt: "Spaghetti alla Carbonara",
      description: "Classic Roman pasta with eggs, pancetta, and pecorino cheese",
      descriptionIt: "Pasta romana classica con uova, pancetta e pecorino",
      category: "main",
      price: 24.99,
      image: "/images/carbonara.jpg",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: false,
      featured: true,
    },
    {
      name: "Osso Buco",
      nameIt: "Osso Buco alla Milanese",
      description: "Braised veal shanks with vegetables and white wine, served with risotto",
      descriptionIt: "Stinco di vitello brasato con verdure e vino bianco, servito con risotto",
      category: "main",
      price: 32.99,
      image: "/images/ossobuco.jpg",
      allergens: JSON.stringify(["dairy"]),
      vegan: false,
      glutenFree: true,
      vegetarian: false,
      featured: true,
    },
    {
      name: "Margherita Pizza",
      nameIt: "Pizza Margherita",
      description: "Classic Neapolitan pizza with tomato, mozzarella, and fresh basil",
      descriptionIt: "Pizza napoletana classica con pomodoro, mozzarella e basilico fresco",
      category: "main",
      price: 18.99,
      image: "/images/margherita.jpg",
      allergens: JSON.stringify(["gluten", "dairy"]),
      vegan: false,
      glutenFree: false,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Tiramisu",
      nameIt: "Tiramisù",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      descriptionIt: "Dolce italiano classico con savoiardi al caffè e mascarpone",
      category: "dessert",
      price: 10.99,
      image: "/images/tiramisu.jpg",
      allergens: JSON.stringify(["gluten", "dairy", "eggs"]),
      vegan: false,
      glutenFree: false,
      vegetarian: true,
      featured: true,
    },
    {
      name: "Panna Cotta",
      nameIt: "Panna Cotta",
      description: "Silky vanilla custard with berry compote",
      descriptionIt: "Crema di vaniglia setosa con composta di frutti di bosco",
      category: "dessert",
      price: 9.99,
      image: "/images/pannacotta.jpg",
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
      image: "/images/chianti.jpg",
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
      image: "/images/blog-1.jpg",
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
      image: "/images/blog-2.jpg",
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
