# Resonant CWPP 🛡️

**Built for TreeHacks 2026**

California is burning. Every year, we watch as our communities are threatened by increasingly severe wildfires. But the problem isn't just the fire—it's the disconnect between the data we have and the people who need it.

We built **Resonant CWPP** because we believe that a Community Wildfire Protection Plan shouldn't just be a PDF sitting on a government server. It should be a living, breathing platform that connects residents, first responders, and vulnerable populations in real-time.

## The Problem
Most wildfire apps are either too generic (providing just a weather forecast) or too complex (aimed only at forestry experts). They fail to account for the human element:
- **Language barriers** prevent critical info from reaching everyone.
- **Generic alerts** lead to "alarm fatigue."
- **Vulnerable populations** (AFN) are often left as an afterthought in evacuation planning.

## Our Solution
We created an **Intelligence Layer** that adapts the entire application based on who you are.

### 🚒 For First Responders ("The Commander")
We give you the data you actually need to make decisions.
- **Tactical Dark Mode**: Designed for low-light environments.
- **Live Unit Tracking**: Know exactly where your assets are.
- **Vulnerable Population Mapping**: See exactly where AFN residents are located to prioritize evacuations.

### 🏡 For Residents ("The Protector")
We turn anxiety into action.
- **Defensible Space Score**: A gamified way to track how safe your home is.
- **Specific Action Plans**: Instead of "be prepared," we say "Clear the dry leaves from your north gutter."
- **Hyper-Local Alerts**: We use your exact location to filter out noise.

### 🎓 For Youth ("The Future")
We engage the next generation.
- **Gamified Learning**: Earn ranks like "Junior Ranger" by learning about fire safety.
- **Missions**: Simple tasks that help the whole family stay safe.

## How We Built It
We used **Next.js** for a snappy, responsive frontend and **Tailwind CSS** to build a custom design system that feels premium and trustworthy. The "Command Center" uses **Framer Motion** for fluid transitions because in a crisis, clunky UI is a safety hazard.

For the intelligence layer, we mocked a **Fire Weather Index (FWI)** engine that takes real-time inputs (Wind, Temp, Humidity) and determines the exact risk level for your specific micro-climate.

## Try It Out
1. Clone the repo.
2. `npm install`
3. `npm run dev`
4. Sign up as a **Resident**, **First Responder**, or **Student** to see how the UI changes for you.

---

*Made with ❤️ (and a lot of caffeine) at Stanford.*
