# CampKart

Responsive campus marketplace prototype for college students to buy, sell, or rent items from one another.

## Project Flow

```mermaid
flowchart TD
	A[Student wants to buy, sell, or rent] --> B[Chooses a category]
	B --> C[Creates a listing]
	C --> D[Item appears in marketplace feed]
	D --> E[Another student views the listing]
	E --> F[Student taps Contact student]
	F --> G[Students connect directly]
	G --> H[Purchase or rental is completed]

	C --> I[Examples: Books, laptops, monitors, bikes, clothes]
	D --> J[Example listing: Calculator for ₹800]
```

## Run

Open `index.html` in a browser, or serve the folder with any static server if you prefer.