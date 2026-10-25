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
    name: "Rustic Wedding",
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
      }
    }
  },
  {
    id: "neon-birthday",
    name: "Neon 21st Birthday",
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
      }
    }
  },
  {
    id: "tech-hackathon-gala",
    name: "Tech Hackathon Gala",
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
      }
    }
  }
];
