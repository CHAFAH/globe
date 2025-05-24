
#  Color Display App by Hilltop Consultancy

This is a small Node.js web application that displays:

- A customizable background color
- The current month's calendar (if enabled)
- Country information (if provided)

It also features a rotating Earth background to enhance the visual experience. The app is fully containerized with Docker and configurable via environment variables.

---

## How to Run

###  1. Build the Docker image

```bash
docker build -t hilltopconsultancy/globe .
````

###  2. Run the app with environment variables

```bash
docker run -e COLOR=green -e CALENDAR=true -e COUNTRY="Cameroon" -p 8080:8080 hilltopconsultancy/globe
```

Then open your browser to:

```
http://localhost:8080
```

---

##  Environment Variables

| Variable   | Description                       | Default  |
| ---------- | --------------------------------- | -------- |
| `COLOR`    | Background color (e.g. blue, red) | blue     |
| `CALENDAR` | Show calendar if `true`           | false    |
| `COUNTRY`  | Display country name if provided  | *(none)* |

---

## 👤 Maintainer

Hilltop Consultancy
 [support@htconsult.dk](mailto:support@htconsult.dk)
 [https://www.htconsult.dk](https://www.htconsult.dk)


