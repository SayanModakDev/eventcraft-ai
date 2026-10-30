import { EventIntakeData, EventPlan } from "@/types/event";

export interface DemoPreset {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  badge: string;
  data: EventIntakeData;
  mockBlueprint: EventPlan;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "rustic-wedding",
    name: "Rustic Meadow Wedding",
    emoji: "🌿",
    tagline: "Earthy vineyard romantic charm with twinkling fairy lights and acoustic melodies",
    badge: "Most Popular",
    data: {
      eventType: "Wedding",
      eventTitle: "Autumn Meadow Romantic Wedding",
      guestCount: 120,
      totalBudget: 25000,
      currency: "USD",
      vibe: "Rustic Bohemia, warm amber lanterns, reclaimed wood banquet tables, lush greenery florals",
      locationOrVenue: "Scenic Hilltop Barn & Orchard, Napa Valley",
      specialRequirements: "Farm-to-table artisanal dinner, gluten-free dessert bar, acoustic trio for ceremony",
    },
    mockBlueprint: {
      event_title: "Autumn Meadow Romantic Wedding",
      theme_tagline: "Golden Glow & Reclaimed Wood: An Intimate Boho-Rustic Celebration",
      audience_profile: "Close family, high school/college friends, and foodies who cherish artisanal ambiance and heartfelt memories.",
      total_budget: 25000,
      currency: "USD",
      budget_breakdown: [
        {
          category: "Venue & Barn Rental",
          percentage: 30,
          estimated_cost: 7500,
          cost_saving_tip: "Book on a Friday afternoon or Sunday brunch slot to negotiate up to 15% off standard Saturday peak rates."
        },
        {
          category: "Farm-to-Table Catering & Bar",
          percentage: 32,
          estimated_cost: 8000,
          cost_saving_tip: "Serve signature herbal craft cocktails and local vintage wines instead of an open top-shelf hard liquor bar."
        },
        {
          category: "Photography & Super-8 Film",
          percentage: 14,
          estimated_cost: 3500,
          cost_saving_tip: "Contract a 6-hour package focusing on ceremony and early reception speeches rather than full 10-hour coverage."
        },
        {
          category: "Floral Arches & Greenery Decor",
          percentage: 12,
          estimated_cost: 3000,
          cost_saving_tip: "Prioritize potted olive trees and seeded eucalyptus garlands over high-cost cut peony arrangements."
        },
        {
          category: "Acoustic Band & Audio Sound",
          percentage: 8,
          estimated_cost: 2000,
          cost_saving_tip: "Hire an acoustic duo for live ceremony + cocktail hour, then transition to a curated high-fidelity DJ playlist for the evening."
        },
        {
          category: "Stationery, Favors & Contingency",
          percentage: 4,
          estimated_cost: 1000,
          cost_saving_tip: "Use digital RSVP suites paired with handwritten seed-paper place tags that guests can plant at home."
        }
      ],
      timeline_milestones: [
        {
          phase: "Phase 1: 4 Months Out (Foundations)",
          tasks: [
            {
              task_name: "Lock Barn Venue & Weather Contingency Tent",
              priority: "High",
              description: "Finalize deposit with Napa Hilltop Barn and confirm on-site restroom facilities and generator permits."
            },
            {
              task_name: "Select Farm-to-Table Caterer & Tasting Session",
              priority: "High",
              description: "Sample autumn squash ravioli and honey-glazed trout; finalize dietary accommodations for guests."
            },
            {
              task_name: "Book Lead Photographer",
              priority: "Medium",
              description: "Review documentary-style sunset portfolios and schedule an engagement mood board call."
            }
          ]
        },
        {
          phase: "Phase 2: 6 Weeks Out (Aesthetics & Logistics)",
          tasks: [
            {
              task_name: "Floral & Vintage Furniture Sourcing",
              priority: "Medium",
              description: "Reserve wooden cross-back chairs, ambient festoon string lighting, and terracotta ceramic runners."
            },
            {
              task_name: "Issue Digital Invites & Menu Preferences",
              priority: "High",
              description: "Send animated invitations with QR code linking directly to personalized dietary selection form."
            },
            {
              task_name: "Curate Acoustic Ceremony Song List",
              priority: "Low",
              description: "Coordinate key walk-in song and exit celebration track with acoustic guitarist."
            }
          ]
        },
        {
          phase: "Phase 3: Event Week & Day-Of Execution",
          tasks: [
            {
              task_name: "Final Walkthrough & Sound Check",
              priority: "High",
              description: "Verify generator load, acoustic mic battery levels, and placement of welcome champagne table."
            },
            {
              task_name: "Deliver Seed-Paper Escort Cards",
              priority: "Medium",
              description: "Set up the wooden ladder card display at the orchard entrance before golden hour begins."
            },
            {
              task_name: "Late-Night S'mores Firepit Activation",
              priority: "Low",
              description: "Stock fire pit with cedar kindling, artisanal graham crackers, and gourmet dark chocolate wafers."
            }
          ]
        }
      ],
      vendor_checklists: [
        {
          vendor_type: "Venue Manager",
          suggested_deliverables: [
            "Exclusive barn & orchard access from 10:00 AM to 11:30 PM",
            "Bridal dressing suite with climate control and full-length mirrors",
            "Setup of 15 banquet tables and 120 cross-back wooden chairs"
          ],
          negotiation_questions: [
            "Is there an extra fee for bringing our own local boutique winery cases?",
            "What is the noise curfew policy for outdoor acoustic performances?",
            "Can trash removal and post-event cleanup be bundled into the venue deposit?"
          ],
          red_flags_to_avoid: [
            "No backup power generator on-site for remote barn locations",
            "Hidden $500/hr overtime surcharges not listed in standard brochure",
            "Strict non-negotiable vendor exclusivity lists with high kickbacks"
          ]
        },
        {
          vendor_type: "Artisanal Caterer",
          suggested_deliverables: [
            "Plated 3-course seasonal dinner with farm-sourced ingredients",
            "4 passed hors d'oeuvres during the orchard cocktail hour",
            "Full service waitstaff, busser crew, and post-dinner water station"
          ],
          negotiation_questions: [
            "Do you provide barware, cloth napkins, and stoneware plates in your per-head quote?",
            "Can we freeze the head count 10 days prior without penalty?",
            "What is the vendor meal rate for photographer and musicians?"
          ],
          red_flags_to_avoid: [
            "Unclear ratio of servers to guests (ideally 1 server per 12-15 guests)",
            "Vague corkage fees and cake-cutting surcharges that inflate bill",
            "Lack of written food-safety certifications for mobile kitchen setups"
          ]
        },
        {
          vendor_type: "Photographer & Videographer",
          suggested_deliverables: [
            "8 hours of dual-shooter raw and edited documentary coverage",
            "Online gallery with 500+ high-resolution, color-graded photos",
            "3-minute cinematic 4K highlight reel set to licensed acoustic track"
          ],
          negotiation_questions: [
            "Are full personal printing and sharing rights included with no watermarks?",
            "What is your delivery turnaround timeline for sneak peek photos?",
            "Do you carry equipment liability and backup cameras in case of malfunction?"
          ],
          red_flags_to_avoid: [
            "Contract missing guaranteed delivery deadline (e.g., beyond 12 weeks)",
            "Lack of backup dual-card slot cameras for once-in-a-lifetime moments",
            "High travel or mileage surcharges added after signing"
          ]
        }
      ],
      personalized_ideas: {
        decor_concept: "Earthy Tuscan-meets-California rustic: exposed grain harvest tables lined with seeded eucalyptus, terracotta clay pots, beeswax taper candles, and warm bistro festoon lights overhead.",
        signature_activity: "Handmade S'mores & Bourbon Tasting Lounge: A cozy fire pit area where guests roast gourmet marshmallows with smoked vanilla bean wafers alongside a barrel-aged bourbon tasting station.",
        curated_playlist_vibe: "Warm indie-folk and soulful acoustic grooves featuring Leon Bridges, Vance Joy, Norah Jones, and Ray LaMontagne, building into upbeat vintage Motown dance grooves.",
        invitation_copy: "Under open skies and whispering pines, we invite you to celebrate love, laughter, and lifelong friendship. Join us for an evening of harvest tables, acoustic melodies, and dancing under the stars."
      },
      dietary_breakdown: [
        {
          category: "Vegetarian & Vegan",
          estimated_percentage: 22,
          recommended_substitutions: "Wild forest mushroom and black truffle risotto with crispy sage; roasted rainbow carrots with tahini glaze.",
          chef_note: "Prepared in a dedicated prep station to avoid cross-contact with animal fats."
        },
        {
          category: "Gluten-Free",
          estimated_percentage: 15,
          recommended_substitutions: "Polenta cakes with rosemary ratatouille; flourless dark chocolate torte with raspberry coulis.",
          chef_note: "All sauces thickened with cornstarch or arrowroot rather than wheat flour."
        },
        {
          category: "Standard Artisanal Omnivore",
          estimated_percentage: 63,
          recommended_substitutions: "Pan-seared local rainbow trout with lemon herb butter; dry-aged braised short rib.",
          chef_note: "Farm-to-table pasture-raised proteins sourced within a 50-mile radius."
        }
      ],
      day_of_schedule: [
        {
          time: "15:00 - 15:45",
          activity: "Guest Arrival & Sparkling Elderflower Welcome Spritz",
          lead_coordinator_or_vendor: "Venue Greeters & Acoustic Guitarist",
          logistical_cue: "Cue soft acoustic ambient melodies as shuttles drop guests at the orchard gate."
        },
        {
          time: "16:00 - 16:45",
          activity: "Orchard Meadow Ceremony",
          lead_coordinator_or_vendor: "Wedding Officiant & Audio Tech",
          logistical_cue: "Soundcheck wireless lapel mic; ensure generator buffer for live amplification."
        },
        {
          time: "17:00 - 18:15",
          activity: "Golden Hour Cocktail Hour & Charcuterie Harvest Table",
          lead_coordinator_or_vendor: "Catering Captain & Bar Team",
          logistical_cue: "Passed heirloom crostini; photographer whisks couple away for 30-min sunset portraits."
        },
        {
          time: "18:30 - 20:15",
          activity: "Plated Barn Dinner & Heartfelt Toasts",
          lead_coordinator_or_vendor: "Lead Coordinator & Banquet Staff",
          logistical_cue: "Dim barn festoon lighting by 20%; light tabletop beeswax taper candles."
        },
        {
          time: "20:30 - 22:30",
          activity: "Live Band Dance Party & Bourbon S'mores Lounge Activation",
          lead_coordinator_or_vendor: "Ensemble Band & Fire Pit Attendant",
          logistical_cue: "Ignite fire pits outside barn perimeter; distribute gourmet marshmallow roasting skewers."
        },
        {
          time: "22:45 - 23:00",
          activity: "Sparkler Exit & Shuttles Departure",
          lead_coordinator_or_vendor: "Coordinator & Transportation Fleet",
          logistical_cue: "Distribute 20-inch smokeless wedding sparklers; line the pathway to departure coaches."
        }
      ],
      logistics_contingency: {
        seating_and_floorplan_advice: "Staggered 8-foot rectangular wooden harvest tables in a U-formation framing a central 18x18ft reclaimed wood dance floor, allowing unblocked views of the head table from all angles.",
        weather_contingency_plan: "High-peak sailcloth tent with clear side walls reserved on 48-hour tentative hold; two commercial propane patio blowers staged adjacent to the barn doors in case of unexpected drop in evening temperature.",
        emergency_kit_essentials: [
          "Compact wireless clothing steamer and fabric lint rollers",
          "Translucent silicone heel protectors for lawn walking",
          "Hypoallergenic bug repellent spritz and organic sunscreen bottles",
          "Mini floral repair kit with green florist wire and floral shears"
        ]
      }
    }
  },
  {
    id: "neon-birthday",
    name: "Neon Cyberpunk 21st Birthday",
    emoji: "⚡",
    tagline: "High-octane cyberpunk nightlife with UV glow bars, LED dancefloor, and electronic beats",
    badge: "Trending Nightlife",
    data: {
      eventType: "Birthday Party",
      eventTitle: "Neon Cyberpunk 21st Birthday Bash",
      guestCount: 75,
      totalBudget: 8000,
      currency: "USD",
      vibe: "Cyberpunk, neon magenta & electric cyan lights, futuristic laser installations, vaporwave beats",
      locationOrVenue: "Industrial Loft / Rooftop Warehouse Studio, Downtown",
      specialRequirements: "UV body paint artist, nitrogen cocktail mixologist, 360-degree rotating selfie booth",
    },
    mockBlueprint: {
      event_title: "Neon Cyberpunk 21st Birthday Bash",
      theme_tagline: "Electric Pulse & Midnight Luminescence: An Immersive 21st Cyberpunk Odyssey",
      audience_profile: "Trendy Gen-Z creative crowd, electronic music lovers, Instagram/TikTok creators, and close college peers.",
      total_budget: 8000,
      currency: "USD",
      budget_breakdown: [
        {
          category: "Warehouse Loft Rental",
          percentage: 28,
          estimated_cost: 2240,
          cost_saving_tip: "Book an unbranded art gallery or photo studio instead of commercial nightclub VIP rooms."
        },
        {
          category: "UV Mixology & Street Food Sliders",
          percentage: 30,
          estimated_cost: 2400,
          cost_saving_tip: "Prepare batch neon-colored tonic cocktails (quinine glows under blacklight) to save on individual mixology labor."
        },
        {
          category: "DJ, Sound System & Lasers",
          percentage: 20,
          estimated_cost: 1600,
          cost_saving_tip: "Partner with an up-and-coming resident club DJ who supplies their own Pioneer decks and wireless subwoofers."
        },
        {
          category: "360 Video Booth & Neon Glow Stations",
          percentage: 14,
          estimated_cost: 1120,
          cost_saving_tip: "Rent an automated iPad-based 360 platform rather than hiring an expensive full-crew production."
        },
        {
          category: "LED Wristbands & UV Body Paint Bar",
          percentage: 8,
          estimated_cost: 640,
          cost_saving_tip: "Order bulk glow batons and neon temporary tattoos online to create self-service DIY face painting bars."
        }
      ],
      timeline_milestones: [
        {
          phase: "Phase 1: 3 Weeks Out (Space & Production)",
          tasks: [
            {
              task_name: "Secure Loft Studio with Blackout Curtains",
              priority: "High",
              description: "Confirm power breaker capacity for multi-kilowatt sound rig and smoke haze machine."
            },
            {
              task_name: "Book Club DJ & Laser Light Tech",
              priority: "High",
              description: "Share playlist cues: UK Garage, Future Bass, Synthwave, and 2000s throwback dance remixes."
            }
          ]
        },
        {
          phase: "Phase 2: 1 Week Out (Vibe & Experience)",
          tasks: [
            {
              task_name: "Test Glow Cocktails & Blacklight Lighting",
              priority: "Medium",
              description: "Confirm tonic water luminescence and prepare customized neon acrylic stirrers with birthday initials."
            },
            {
              task_name: "Distribute Cyberpunk Dress Code Guide",
              priority: "Medium",
              description: "Send digital mood board recommending iridescent jackets, metallic accessories, and neon accents."
            }
          ]
        },
        {
          phase: "Phase 3: Party Night Execution",
          tasks: [
            {
              task_name: "Haze Machine & UV Lights Warmup",
              priority: "High",
              description: "Prime atmospheric haze at 8:30 PM; activate sound-reactive neon tube lights around dance perimeter."
            },
            {
              task_name: "Champagne Gun & Confetti Blast at Midnight",
              priority: "High",
              description: "Stage biodegradable metallic confetti cannons and led bottle sparklers for the official countdown."
            }
          ]
        }
      ],
      vendor_checklists: [
        {
          vendor_type: "Loft Studio Venue",
          suggested_deliverables: [
            "Industrial studio access from 4:00 PM to 3:00 AM",
            "Freight elevator access for heavy speaker rigs and laser truss",
            "Integrated HVAC ventilation suitable for stage fog and haze"
          ],
          negotiation_questions: [
            "Are fog and cold spark machines permitted under standard venue insurance?",
            "Can we bring our own licensed bartender and wholesale alcohol?",
            "What are the sound limit decibel thresholds after midnight?"
          ],
          red_flags_to_avoid: [
            "Residential building restrictions with strict 10 PM sound shutoffs",
            "No dedicated security personnel to check IDs at the street door",
            "Lack of adequate electrical circuits triggering circuit breaker trips"
          ]
        },
        {
          vendor_type: "DJ & Audiovisual Technician",
          suggested_deliverables: [
            "2x 18-inch subwoofers and line array tops for punchy bass",
            "DMX-controlled moving head lasers and UV flood fixtures",
            "Wireless microphone and seamless backup laptop audio link"
          ],
          negotiation_questions: [
            "Do you take live crowd song requests through an interactive QR code?",
            "Can you sync lighting sequences to key drop moments in the set?",
            "Is equipment insurance and liability coverage included in quote?"
          ],
          red_flags_to_avoid: [
            "Inadequate low-frequency bass that feels thin in high-ceiling spaces",
            "Using static home consumer speakers rather than professional PA systems",
            "No backup controller or auxiliary cabling on site"
          ]
        }
      ],
      personalized_ideas: {
        decor_concept: "Blade Runner aesthetic: moody darkness slashed with vibrant magenta and cyan LED strip towers, hanging neon kanji/cyber signage, mirror tunnels, and UV glow tape geometric floor grids.",
        signature_activity: "Luminescent UV Paint Bar & 360 Matrix Glitch Booth: Guests get neon tribal and geometric facial designs painted before stepping into a high-speed rotating camera booth with retro glitch video filters.",
        curated_playlist_vibe: "High-energy French Touch, Future House, Synthwave and Tech-House featuring Fred again.., Disclosure, Peggy Gou, Daft Punk, and Fisher.",
        invitation_copy: "SYSTEM REBOOT: Turn on, tune in, and light up the dark. Step into Neo-Tokyo as we celebrate 21 years on this planet. Dress in neon, iridescent, or midnight black. Let's make the bass rumble."
      },
      dietary_breakdown: [
        {
          category: "Late Night Street-Food (Omnivore)",
          estimated_percentage: 60,
          recommended_substitutions: "Korean BBQ beef sliders with kimchi slaw; crispy chicken bao buns with spicy gochujang aioli.",
          chef_note: "Designed as hand-held, mess-free finger foods ready for the active dancefloor."
        },
        {
          category: "Vegan / Plant-Based",
          estimated_percentage: 30,
          recommended_substitutions: "Crispy panko avocado sliders; glazed shiitake bao buns with crushed peanuts.",
          chef_note: "Clearly labeled with neon glow toothpicks for easy identification."
        },
        {
          category: "Non-Alcoholic Mocktails",
          estimated_percentage: 25,
          recommended_substitutions: "Electric blue butterfly pea flower lemonade with tonic water glow effect; sparkling yuzu ginger beer.",
          chef_note: "Served in luminescent cups with LED ice cubes."
        }
      ],
      day_of_schedule: [
        {
          time: "20:00 - 21:00",
          activity: "Cyberpunk Doors Open & UV Glow Paint Activation",
          lead_coordinator_or_vendor: "Venue Host & Body Art Duo",
          logistical_cue: "Activate blacklights; provide welcome glowing shots to guests entering the tunnel."
        },
        {
          time: "21:00 - 22:30",
          activity: "DJ Warmup Set & Interactive 360 Video Booth Launch",
          lead_coordinator_or_vendor: "DJ & 360 Camera Technician",
          logistical_cue: "Ambient synthwave shifts into punchy tech-house; queue passed sliders."
        },
        {
          time: "23:45 - 00:15",
          activity: "Midnight Birthday Countdown & Cryo-Fog Confetti Blast",
          lead_coordinator_or_vendor: "DJ & Stage Effects Tech",
          logistical_cue: "Trigger CO2 cryo jets and metallic fuchsia confetti burst as birthday cake is wheeled out."
        },
        {
          time: "00:15 - 02:00",
          activity: "Peak EDM Rave Dancefloor & Neon Midnight Pizza Delivery",
          lead_coordinator_or_vendor: "DJ & Catering Crew",
          logistical_cue: "Serve hot square-cut Detroit style pizza slices in neon LED pizza boxes."
        }
      ],
      logistics_contingency: {
        seating_and_floorplan_advice: "Open central perimeter with lounge pods composed of inflatable black vinyl sofas and LED wireframe cube coffee tables, preserving 75% of room volume as an unrestricted dance zone.",
        weather_contingency_plan: "100% indoor climate-controlled warehouse venue; industrial ventilation and redundant air conditioning units running continuously to handle party heat.",
        emergency_kit_essentials: [
          "High-fidelity silicone concert earplugs for guest comfort",
          "Hydration electrolyte powder packs and bottled water cases",
          "Heavy duty gaffer tape for audio cable floor securing",
          "Universal multi-head phone charging bank stations"
        ]
      }
    }
  },
  {
    id: "tech-hackathon-gala",
    name: "Global Tech Hackathon Finale Gala",
    emoji: "🚀",
    tagline: "Inspiring demo day finale with investor mixers, high-tech stages, and celebration dinner",
    badge: "Corporate & Tech",
    data: {
      eventType: "Conference / Gala",
      eventTitle: "Global AI Innovators Hackathon Finale Gala",
      guestCount: 250,
      totalBudget: 45000,
      currency: "USD",
      vibe: "Modern tech sleek, minimal obsidian and electric violet, interactive demo booths, dynamic LED wall",
      locationOrVenue: "Metropolitan Tech Innovation Hub & Auditorium, San Francisco",
      specialRequirements: "Ultra-fast Gigabit Wi-Fi, low-latency live streaming rig, VIP investor lounge, gourmet brain-fuel buffet",
    },
    mockBlueprint: {
      event_title: "Global AI Innovators Hackathon Finale Gala",
      theme_tagline: "Code, Create, Elevate: Celebrating Tomorrow's Autonomous Breakthroughs",
      audience_profile: "Founders, venture capitalists, software engineers, university fellows, and tech journalists.",
      total_budget: 45000,
      currency: "USD",
      budget_breakdown: [
        {
          category: "Tech Innovation Hub & Auditorium",
          percentage: 33,
          estimated_cost: 14850,
          cost_saving_tip: "Negotiate a co-sponsorship package where venue branding appears on event keynote badges and stream overlays."
        },
        {
          category: "Keynote AV, LED Wall & Multi-cam Stream",
          percentage: 27,
          estimated_cost: 12150,
          cost_saving_tip: "Opt for an in-house auditorium AV tech crew rather than bringing third-party outside staging equipment."
        },
        {
          category: "Executive Brain-Fuel Catering & Reception Bar",
          percentage: 22,
          estimated_cost: 9900,
          cost_saving_tip: "Offer artisanal food stations (bao buns, poke bowls, microgreen sliders) rather than costly seated 4-course banquet."
        },
        {
          category: "Custom Trophies, Swag & Holographic Badges",
          percentage: 11,
          estimated_cost: 4950,
          cost_saving_tip: "Provide premium sustainable tech jackets and NFC smart badges that double as digital contact exchange tools."
        },
        {
          category: "Signage, Live Polling & Contingency",
          percentage: 7,
          estimated_cost: 3150,
          cost_saving_tip: "Replace physical foam board signs with dynamic e-ink and digital display tablets at demo tables."
        }
      ],
      timeline_milestones: [
        {
          phase: "Phase 1: 8 Weeks Out (Strategic Alignment)",
          tasks: [
            {
              task_name: "Contract Innovation Hub & Dedicated Dual 1Gbps Fiber",
              priority: "High",
              description: "Stress test concurrent connections for 500+ mobile and laptop devices."
            },
            {
              task_name: "Confirm Judging Panel & Investor Invitations",
              priority: "High",
              description: "Confirm 5 tier-1 VC partners and tech executives for the pitch evaluation rubric."
            }
          ]
        },
        {
          phase: "Phase 2: 2 Weeks Out (Production & Rehearsals)",
          tasks: [
            {
              task_name: "Pitch Deck Ingestion & AV Calibration",
              priority: "High",
              description: "Dry run slide changes on 4K LED wall; configure teleprompter and handheld Shure wireless microphones."
            },
            {
              task_name: "Set up Live Stream Broadcast & Backup CDN",
              priority: "Medium",
              description: "Configure low-latency YouTube/LinkedIn stream with sponsor lower-thirds graphics."
            }
          ]
        },
        {
          phase: "Phase 3: Gala Day Execution",
          tasks: [
            {
              task_name: "Demo Booth Power & Display Checks",
              priority: "High",
              description: "Power up 30 startup demo stations, HDMI monitors, and QR code voting scanners."
            },
            {
              task_name: "Trophy Presentation & Confetti Finale",
              priority: "Medium",
              description: "Trigger digital fanfare music and stage smoke as grand prize winners receive 3D crystal trophies."
            }
          ]
        }
      ],
      vendor_checklists: [
        {
          vendor_type: "Tech Venue & Infrastructure",
          suggested_deliverables: [
            "Auditorium seating for 250 with power sockets per seat",
            "Dedicated secure VLAN and Wi-Fi 6 AP network",
            "Green room for keynote speakers and judging deliberation"
          ],
          negotiation_questions: [
            "Can we host a cocktail networking reception in the atrium immediately following the auditorium pitches?",
            "Is security staff included for building entrance validation?",
            "Are there recycling and electronic disposal facilities on-site?"
          ],
          red_flags_to_avoid: [
            "Network throttling policies or bandwidth caps during high demo traffic",
            "Lack of backup generator or UPS for central presentation switches",
            "Strict acoustic limits preventing energetic awards ceremony music"
          ]
        },
        {
          vendor_type: "Live AV & Broadcast Crew",
          suggested_deliverables: [
            "3-camera setup with crane angle and live director switching",
            "High-contrast P2.5 indoor LED backdrop wall (20ft x 10ft)",
            "Master pristine audio feed recording with multitrack backup"
          ],
          negotiation_questions: [
            "What is the turnaround time for receiving raw 4K individual speaker highlight clips?",
            "Can sponsor video reels be queued and triggered via Stream Deck?",
            "Do you have hot-swappable backup transmitters for wireless lapel mics?"
          ],
          red_flags_to_avoid: [
            "Audio buzzing or interference from auditorium lighting dimmer packs",
            "Delay in livestream video sync causing jarring user experience",
            "Single point of failure on master video recording storage"
          ]
        }
      ],
      personalized_ideas: {
        decor_concept: "Architectural Silicon Elegance: Matte obsidian monolith stages, diffused violet perimeter uplighting, geometric floating wireframe sculptures, and ambient low-fog stage reveals.",
        signature_activity: "Real-time AI Pitch Battle & Crowd Staking: Audience members receive digital event tokens via NFC smart badges to vote in real-time on live leaderboards displayed across the auditorium LED wall.",
        curated_playlist_vibe: "Progressive ambient electronic, cinematic downtempo, and modern minimalist pulses featuring Max Cooper, Tycho, Jon Hopkins, and Bonobo.",
        invitation_copy: "Witness the genesis of tomorrow's breakthroughs. You are cordially invited to the Global AI Innovators Finale Gala. Join top founders, creators, and visionaries for an unforgettable evening of live demos, investor networking, and high-impact innovation."
      },
      dietary_breakdown: [
        {
          category: "Brain-Fuel Plant-Forward",
          estimated_percentage: 35,
          recommended_substitutions: "Warm quinoa avocado bowls with roasted chickpeas and turmeric ginger dressing; matcha chia seed pudding.",
          chef_note: "Designed with low-glycemic, sustained-energy ingredients to prevent afternoon slump."
        },
        {
          category: "Halal & Kosher Friendly",
          estimated_percentage: 20,
          recommended_substitutions: "Certified Halal za'atar chicken skewers with garlic toum; pomegranate couscous salad.",
          chef_note: "Sourced from certified purveyors with separate heating ovens."
        },
        {
          category: "Gluten-Free & Dairy-Free",
          estimated_percentage: 18,
          recommended_substitutions: "Crispy wild salmon rice paper rolls; coconut milk mango tapioca cups.",
          chef_note: "All allergen-free stations clearly denoted with color-coded QR menu cards."
        }
      ],
      day_of_schedule: [
        {
          time: "16:00 - 17:00",
          activity: "Founder Showcase & Interactive Prototype Demo Floor",
          lead_coordinator_or_vendor: "Booth Operations & AV Director",
          logistical_cue: "Broadcast ambient electronic soundscapes; open cold beverage stations."
        },
        {
          time: "17:15 - 19:00",
          activity: "Top 10 Finalist Pitch Presentations on Keynote Stage",
          lead_coordinator_or_vendor: "Stage Emcee & Live Broadcast Crew",
          logistical_cue: "Strict 4-minute presentation timers on confidence monitors; live stream feed on."
        },
        {
          time: "19:00 - 19:45",
          activity: "VIP Investor Mixer & Deliberation Intermission",
          lead_coordinator_or_vendor: "Investor Relations & Head of Catering",
          logistical_cue: "Passed brain-fuel hors d'oeuvres; judging panel convenes in the private boardroom."
        },
        {
          time: "20:00 - 21:30",
          activity: "Grand Awards Ceremony, Trophy Reveal & Celebration Reception",
          lead_coordinator_or_vendor: "Executive Emcee & Stage Effects",
          logistical_cue: "Trigger crystal trophy fanfare and live audience staking leaderboard reveal."
        }
      ],
      logistics_contingency: {
        seating_and_floorplan_advice: "Tiered auditorium seating for the pitch competition transitioning seamlessly into an open atrium networking floor with high-top cocktail tables and dual projection screens.",
        weather_contingency_plan: "Fully enclosed state-of-the-art tech conference facility with underground parking and covered pedestrian skyways; zero outdoor exposure risk.",
        emergency_kit_essentials: [
          "Emergency cellular 5G mobile hotspot routers for backup network failover",
          "Spare wireless HDMI transmitters and universal USB-C display adapters",
          "Fresh AAA/AA battery packs for all presentation clickers and microphones",
          "Dedicated medical first-aid kit and automated external defibrillator (AED)"
        ]
      }
    }
  },
  {
    id: "cultural-sangeet",
    name: "Grand Cultural Sangeet & Reception",
    emoji: "🪔",
    tagline: "Vibrant royal celebration with marigold floral canopies, live dhol, and lavish royal banquet",
    badge: "Heritage & Cultural",
    data: {
      eventType: "Cultural Celebration",
      eventTitle: "Royal Heritage Sangeet & Grand Reception",
      guestCount: 350,
      totalBudget: 1800000,
      currency: "INR",
      vibe: "Royal Rajasthani heritage, golden chandeliers, rich crimson & saffron silk drapes, festive dhol rhythm",
      locationOrVenue: "Heritage Palace Courtyard & Royal Ballroom, Jaipur",
      specialRequirements: "Authentic multi-regional Indian banquet (North Indian, Chaat Street, Mughlai), live brass band, choreographed family dance stage",
    },
    mockBlueprint: {
      event_title: "Royal Heritage Sangeet & Grand Reception",
      theme_tagline: "Rhythms of Royalty: An Opulent Evening of Sangeet, Heritage & Festivity",
      audience_profile: "Multigenerational extended families, lifelong friends, and wedding guests traveling from across the globe.",
      total_budget: 1800000,
      currency: "INR",
      budget_breakdown: [
        {
          category: "Heritage Palace & Ballroom Venue",
          percentage: 30,
          estimated_cost: 540000,
          cost_saving_tip: "Bundle sangeet evening and next-day reception hall booking with the palace management for a 12% combined booking waiver."
        },
        {
          category: "Lavish Multi-Course Royal Banquet",
          percentage: 32,
          estimated_cost: 576000,
          cost_saving_tip: "Feature live regional interactive chaat and tandoor counters instead of doubling up on seated plated services."
        },
        {
          category: "Traditional Marigold & Silk Floral Decor",
          percentage: 16,
          estimated_cost: 288000,
          cost_saving_tip: "Source fresh yellow and orange marigold strings and jasmine buds directly from wholesale flower mandis."
        },
        {
          category: "Stage AV, Live Dhol & DJ Sound Rig",
          percentage: 12,
          estimated_cost: 216000,
          cost_saving_tip: "Book a hybrid Bollywood-fusion DJ who brings integrated live percussionists as a package deal."
        },
        {
          category: "Traditional Favors, Mehndi & Photography",
          percentage: 10,
          estimated_cost: 180000,
          cost_saving_tip: "Handcraft brass souvenir diya sets with personalized sweet boxes purchased directly from artisan guilds."
        }
      ],
      timeline_milestones: [
        {
          phase: "Phase 1: 3 Months Out (Venue & Artists)",
          tasks: [
            {
              task_name: "Lock Heritage Courtyard & Dance Stage Staging",
              priority: "High",
              description: "Finalize palace contract; specify heavy load-bearing wooden stage suitable for group choreography."
            },
            {
              task_name: "Book Live Dhol Troupe & Emcee Choreographer",
              priority: "High",
              description: "Share choreography song list for couple and extended family performances."
            }
          ]
        },
        {
          phase: "Phase 2: 1 Month Out (Tastings & Decor)",
          tasks: [
            {
              task_name: "Banquet Menu Tasting & Live Counter Selection",
              priority: "High",
              description: "Approve Dal Baati Churma, Paneer Tikka Angara, Dum Biryani, and Jalebi-Rabri live fry station."
            },
            {
              task_name: "Fabric Drape & Brass Chandelier Mockup",
              priority: "Medium",
              description: "Review saffron and emerald velvet drapes with royal courtyard fairy canopy lighting."
            }
          ]
        },
        {
          phase: "Phase 3: Event Day Execution",
          tasks: [
            {
              task_name: "Courtyard Rangoli & Flower Petal Welcome Prep",
              priority: "Medium",
              description: "Complete 12-foot central floral rangoli and stage rose-petal welcome showers at the main archway."
            },
            {
              task_name: "Choreographed Sangeet Sequence & DJ Transition",
              priority: "High",
              description: "Execute 10 family dance performances followed by explosive open dancefloor dhol jam."
            }
          ]
        }
      ],
      vendor_checklists: [
        {
          vendor_type: "Heritage Palace Venue Manager",
          suggested_deliverables: [
            "Access to courtyard and banquet hall from 12:00 PM to 2:00 AM",
            "Power generators with automatic 10-second changeover switch",
            "Dedicated bridal and family changing suites with security"
          ],
          negotiation_questions: [
            "What is the policy on live fireworks and sparkler cold pyros outdoors?",
            "Can royal guest golf carts be provided for elder transportation?",
            "Are sound curfews flexible if music transitions from courtyard to indoor hall after 10 PM?"
          ],
          red_flags_to_avoid: [
            "Inadequate parking facilities for high guest vehicle volumes",
            "Lack of clean, high-capacity restroom facilities for 350+ guests",
            "Hidden royalty fees for external traditional dessert catering"
          ]
        },
        {
          vendor_type: "Royal Indian Banquet Caterer",
          suggested_deliverables: [
            "30+ item royal dinner buffet including live street food counters",
            "Dedicated tea, coffee, and fresh sugarcane/thandai beverage stalls",
            "1 server per 10 guests with royal traditional attire"
          ],
          negotiation_questions: [
            "Are separate Jain and pure-vegetarian prep stations guaranteed?",
            "What is the live sweet counter refill protocol during peak dinner rush?",
            "Can morning-after breakfast packaging be arranged for leftover sweets?"
          ],
          red_flags_to_avoid: [
            "Recycled cooking oils or unclear ghee authentication",
            "Slow buffet line replenishment causing long guest queues",
            "Unsupervised dish collection leading to clutter in courtyard"
          ]
        }
      ],
      personalized_ideas: {
        decor_concept: "Royal Mewar Heritage: Rich crimson and saffron silk drapery suspended from royal stone arches, 1,000 brass floating oil diyas, fragrant fresh marigold garlands, and majestic gold filigree screens.",
        signature_activity: "Royal Dhol Battle & Custom Henna Lounge: A high-energy live percussion challenge pitting family sides against each other, accompanied by an artisanal henna corner with fragrant organic oils.",
        curated_playlist_vibe: "Joyful celebratory fusion: Classic Rajasthani folk dholak rhythms, timeless Bollywood sangeet anthems, Punjabi bhangra beats, and global diaspora upbeat dance remixes.",
        invitation_copy: "With the blessings of our ancestors and boundless joy in our hearts, we invite you to a royal evening of music, dance, and festivity. Join us as we celebrate our heritage, love, and family harmony under a canopy of stars."
      },
      dietary_breakdown: [
        {
          category: "Pure Vegetarian (Shakahari)",
          estimated_percentage: 55,
          recommended_substitutions: "Paneer Lababdar, Dal Makhani slow-cooked 18 hours, stuffed Kulchas and saffron Pulao.",
          chef_note: "Strict traditional vegetarian preparation with 100% pure deshi ghee."
        },
        {
          category: "Jain Vegetarian (No Onion / Garlic / Root Veg)",
          estimated_percentage: 20,
          recommended_substitutions: "Jain Paneer Makhana Korma, raw banana kofta curry, yellow moong dal tadka.",
          chef_note: "Prepared in a separate consecrated kitchen vessel with dedicated ladle sets."
        },
        {
          category: "Awadhi / Mughlai Non-Veg",
          estimated_percentage: 25,
          recommended_substitutions: "Dum Mutton Biryani, Chicken Tikka Angara, Galouti kebabs on mini parathas.",
          chef_note: "Served at an independent banquet counter on the western pavilion."
        }
      ],
      day_of_schedule: [
        {
          time: "18:00 - 19:15",
          activity: "Royal Shehnai Welcome, Rose Petal Showers & Chaat Street Activation",
          lead_coordinator_or_vendor: "Palace Greeters & Shehnai Troupe",
          logistical_cue: "Shower guests with fresh rose petals as royal turbans (safas) are tied for gentlemen."
        },
        {
          time: "19:30 - 21:00",
          activity: "Choreographed Family Sangeet Performances & Couple Ring Exchange",
          lead_coordinator_or_vendor: "Emcee, DJ & Dance Choreographer",
          logistical_cue: "Dim courtyard lanterns; spotlight stage center for family dance numbers."
        },
        {
          time: "21:00 - 22:30",
          activity: "Grand Royal Feast & Live Dessert Counter (Jalebi & Kulfi Falooda)",
          lead_coordinator_or_vendor: "Banquet Operations Manager",
          logistical_cue: "Open 6 dual-sided buffet lines to eliminate guest wait times."
        },
        {
          time: "22:30 - 01:00",
          activity: "Live Dhol Midnight Jam & Indoor Ballroom Celebration",
          lead_coordinator_or_vendor: "Live Dhol Troupe & Resident DJ",
          logistical_cue: "Transition crowd to air-conditioned palace ballroom for extended dance music."
        }
      ],
      logistics_contingency: {
        seating_and_floorplan_advice: "Traditional low-seating royal Baithak lounge with silk bolster pillows and brass tables adjacent to the main stage for senior family members; round banquet tables with gold Chiavari chairs surrounding.",
        weather_contingency_plan: "Palace inner heritage ballroom on standby with pre-rigged lighting; seamless transition within 15 minutes if unseasonal showers occur.",
        emergency_kit_essentials: [
          "Emergency saree safety pin kits, bobby pins, and floral hair accessories",
          "Shoe bite balm and comfortable velvet flat slip-on sandals",
          "Portable stain remover pens for turmeric / mehendi accidents",
          "Ayurvedic digestion carminative tablets (Hajmola / Pudin Hara)"
        ]
      }
    }
  },
  {
    id: "golden-anniversary",
    name: "Luxury Château Golden 50th Anniversary",
    emoji: "🥂",
    tagline: "Intimate Parisian luxury with vintage grand cru pairings, string quartet, and golden candlelit dinner",
    badge: "Milestone Luxury",
    data: {
      eventType: "Anniversary Celebration",
      eventTitle: "Golden 50th Wedding Jubilee Celebration",
      guestCount: 60,
      totalBudget: 18000,
      currency: "EUR",
      vibe: "Parisian classical elegance, crystal chandeliers, antique gold candelabras, white garden roses, classical strings",
      locationOrVenue: "Historic French Château & Orangerie, Loire Valley",
      specialRequirements: "Curated 5-course French wine-pairing menu, live string quartet, custom vintage family photo projection",
    },
    mockBlueprint: {
      event_title: "Golden 50th Wedding Jubilee Celebration",
      theme_tagline: "Half a Century of Grace: An Intimate Golden Jubilee in the Loire Valley",
      audience_profile: "Multigenerational family, close lifelong companions, and dearest grandchildren honoring a 50-year legacy.",
      total_budget: 18000,
      currency: "EUR",
      budget_breakdown: [
        {
          category: "Château Orangerie & Garden Access",
          percentage: 33,
          estimated_cost: 5940,
          cost_saving_tip: "Select a late spring weekday or Sunday evening to save 20% on exclusive estate rental fees."
        },
        {
          category: "Michelin-Inspired 5-Course Pairing Dinner",
          percentage: 35,
          estimated_cost: 6300,
          cost_saving_tip: "Curate estate-bottled Loire Valley wines (Vouvray & Chinon) directly from neighboring boutique vineyards."
        },
        {
          category: "Classical String Quartet & Audio",
          percentage: 12,
          estimated_cost: 2160,
          cost_saving_tip: "Contract conservatory master graduates for 4 hours covering arrival, toasts, and slow waltzes."
        },
        {
          category: "Antiqued Gold Decor, Florals & Candles",
          percentage: 12,
          estimated_cost: 2160,
          cost_saving_tip: "Rent antique gold vermeil candelabras and blend garden-grown white hydrangeas with spray roses."
        },
        {
          category: "Heirloom Photo Archiving & Keepsakes",
          percentage: 8,
          estimated_cost: 1440,
          cost_saving_tip: "Produce linen-bound foil-stamped family memory books with QR codes linking to digital archives."
        }
      ],
      timeline_milestones: [
        {
          phase: "Phase 1: 3 Months Out (Curating Estate & Menu)",
          tasks: [
            {
              task_name: "Contract Château Orangerie & Suites",
              priority: "High",
              description: "Reserve the south garden lawn and enclosed glass orangerie for private dining."
            },
            {
              task_name: "Design 5-Course Tasting Menu with Sommelier",
              priority: "High",
              description: "Finalize sea bass en papillote, filet de boeuf, and grand cru dessert wine pairing."
            }
          ]
        },
        {
          phase: "Phase 2: 4 Weeks Out (Heirloom Program & Music)",
          tasks: [
            {
              task_name: "Gather 50-Year Family Archival Slides",
              priority: "Medium",
              description: "Digitize 1970s wedding photos for discreet 4K micro-projector retrospective reveal."
            },
            {
              task_name: "Score Classical Repertoire for String Quartet",
              priority: "Medium",
              description: "Include original 1970s first dance waltz and romantic French chansons."
            }
          ]
        },
        {
          phase: "Phase 3: Anniversary Day Execution",
          tasks: [
            {
              task_name: "Orangerie Candelabra Lighting & Place Settings",
              priority: "High",
              description: "Light 40 taper candles 15 minutes before guest entry; align gold-rimmed porcelain."
            },
            {
              task_name: "Golden Champagne Toast & Grandchildren Tribute",
              priority: "High",
              description: "Pour vintage Blanc de Blancs champagne and present engraved golden milestone clock."
            }
          ]
        }
      ],
      vendor_checklists: [
        {
          vendor_type: "Château Estate Director",
          suggested_deliverables: [
            "Exclusive estate and garden access from 14:00 to 00:00",
            "Heated glass orangerie with panoramic sunset view of the vineyard",
            "On-site suites for the jubilee couple and immediate elders"
          ],
          negotiation_questions: [
            "Can we host champagne aperitifs on the terrace before moving indoors for dinner?",
            "Is there an in-house grand piano available for tuning?",
            "What is the heating policy for the orangerie during cool evening hours?"
          ],
          red_flags_to_avoid: [
            "Steep gravel pathways without wheelchair accessibility ramps for older guests",
            "Inadequate thermal insulation in glass conservatories",
            "Lack of dedicated private dressing quarters for honored guests"
          ]
        },
        {
          vendor_type: "Private Chef & Sommelier Team",
          suggested_deliverables: [
            "Plated 5-course dinner with synchronized cloche service",
            "Sommelier wine introductions for each pairing course",
            "French artisanal cheese trolley with local honey and sourdough"
          ],
          negotiation_questions: [
            "Can customized low-sodium and diabetic dietary adaptations be made seamlessly?",
            "Are vintage crystal glasses and silver flatware included in service quote?",
            "Can anniversary cake cutting be accompanied by artisanal espresso service?"
          ],
          red_flags_to_avoid: [
            "Slow pacing exceeding 3 hours between courses causing fatigue",
            "Under-chilled champagne service on warm afternoons",
            "Inflexible chefs unwilling to adjust seasonings for elderly palates"
          ]
        }
      ],
      personalized_ideas: {
        decor_concept: "Timeless Parisian Romance: Antique gold vermeil candelabras with ivory beeswax taper candles, runners of fragrant white garden roses and jasmine vines, gold-rimmed Limoges china, and crystal stemware.",
        signature_activity: "Heirloom Retrospective & Family Golden Waltz: A heartfelt audio-visual showcase narrating 5 decades of love, followed by the couple's commemorative waltz played live by the string quartet.",
        curated_playlist_vibe: "Sophisticated classical and romantic French impressionism: Debussy, Ravel, Satie, classical waltzes, and gentle arrangements of Edith Piaf and Charles Aznavour.",
        invitation_copy: "Fifty years of love, devotion, and shared dreams. You are warmly invited to celebrate the Golden Wedding Anniversary of our beloved parents. Join us for an intimate candlelit dinner in the Loire Valley."
      },
      dietary_breakdown: [
        {
          category: "Gentle Gastronomy (Senior Friendly)",
          estimated_percentage: 40,
          recommended_substitutions: "Tender poached turbot with velvety cauliflower mousseline; slow-simmered poultry supreme with truffled jus.",
          chef_note: "Prepared with minimal salt, soft textures, and light sauces."
        },
        {
          category: "Vegetarian Haute Cuisine",
          estimated_percentage: 20,
          recommended_substitutions: "Roasted king oyster mushroom scallops with pea puree; artichoke barigoule with lemon thyme.",
          chef_note: "Artfully plated to mirror standard meat courses identically."
        },
        {
          category: "Grand Cru Wine Pairings & Mocktails",
          estimated_percentage: 40,
          recommended_substitutions: "Non-alcoholic distilled botanicals (French herbal infusions) paired course-by-course alongside grand cru wines.",
          chef_note: "Ensures teetotal guests enjoy equivalent pairing sophistication."
        }
      ],
      day_of_schedule: [
        {
          time: "17:00 - 18:00",
          activity: "Terrace Champagne Aperitif & String Quartet Serenade",
          lead_coordinator_or_vendor: "Sommelier & String Quartet",
          logistical_cue: "Serve vintage Blanc de Blancs with passed gougères while quartet plays gentle classical waltzes."
        },
        {
          time: "18:15 - 20:30",
          activity: "Five-Course Candlelit Jubilee Banquet in the Orangerie",
          lead_coordinator_or_vendor: "Executive Chef & Floor Captain",
          logistical_cue: "Synchronized cloche service at 6 tables; sommelier announces each wine pairing."
        },
        {
          time: "20:30 - 21:15",
          activity: "Heirloom Retrospective & Grandchildren's Toasts",
          lead_coordinator_or_vendor: "Lead Coordinator & AV Tech",
          logistical_cue: "Project digitized 1970s archive photographs on discrete canvas screen; champagne poured."
        },
        {
          time: "21:30 - 23:00",
          activity: "Anniversary Cake Reveal, Golden Waltz & Artisanal Digestifs",
          lead_coordinator_or_vendor: "String Quartet & Pastry Chef",
          logistical_cue: "Present 3-tier gold leaf French gateau; couple dances commemorative waltz."
        }
      ],
      logistics_contingency: {
        seating_and_floorplan_advice: "Single grand royal banquet table (or 6 circular tables of 10) with cushioned armchairs ensuring supreme comfort for elderly guests, wide pathways allowing ease of movement.",
        weather_contingency_plan: "Château glass orangerie provides full 360-degree garden views while remaining 100% weather-proof and temperature-regulated; interior stone fireplace ready to light if temperature drops.",
        emergency_kit_essentials: [
          "Cashmere shawls and lightweight blankets for garden terrace lounging",
          "Magnifying menu cards and soft warm ambient reading lights",
          "Professional first-aid essentials and blood pressure monitor",
          "Dedicated on-call chauffeur for elder return transportation"
        ]
      }
    }
  }
];
