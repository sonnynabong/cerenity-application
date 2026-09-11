-- Same catalog rows as lib/catalog.ts / convex seed.
-- Convex IDs are assigned at insert time; these UUIDs are the Postgres keys.

INSERT INTO employees (id, name, role, department, email, location) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Maya Chen', 'Head of Product', 'Product', 'maya.chen@cerenity.test', 'Manila'),
  ('11111111-1111-1111-1111-111111111102', 'Jordan Hale', 'Wellness Lead', 'Clinical', 'jordan.hale@cerenity.test', 'Singapore'),
  ('11111111-1111-1111-1111-111111111103', 'Sam Ortiz', 'Hardware PM', 'Product', 'sam.ortiz@cerenity.test', 'Austin'),
  ('11111111-1111-1111-1111-111111111104', 'Priya Shah', 'Supply Chain', 'Operations', 'priya.shah@cerenity.test', 'London'),
  ('11111111-1111-1111-1111-111111111105', 'Alex Rivera', 'People Ops', 'People', 'alex.rivera@cerenity.test', 'Remote'),
  ('11111111-1111-1111-1111-111111111106', 'Chris Novak', 'Support Lead', 'Support', 'chris.novak@cerenity.test', 'Manila'),
  ('11111111-1111-1111-1111-111111111107', 'Riley Cho', 'Finance Partner', 'Finance', 'riley.cho@cerenity.test', 'Singapore'),
  ('11111111-1111-1111-1111-111111111108', 'Dana Okonkwo', 'Counsel', 'Legal', 'dana.okonkwo@cerenity.test', 'London');

INSERT INTO products (id, sku, name, category, price_cents, stock, owner) VALUES
  ('22222222-2222-2222-2222-222222222101', 'CER-101', 'Calm Drops', 'supplements', 2499, 40, 'Maya Chen'),
  ('22222222-2222-2222-2222-222222222102', 'CER-102', 'Sleep Tea', 'beverages', 1899, 120, 'Jordan Hale'),
  ('22222222-2222-2222-2222-222222222103', 'CER-103', 'Focus Chews', 'supplements', 2199, 75, 'Maya Chen'),
  ('22222222-2222-2222-2222-222222222104', 'CER-104', 'Pulse Band', 'wearables', 12900, 18, 'Sam Ortiz'),
  ('22222222-2222-2222-2222-222222222105', 'CER-105', 'Aura Mat', 'recovery', 8900, 22, 'Priya Shah'),
  ('22222222-2222-2222-2222-222222222106', 'CER-106', 'Night Oil', 'supplements', 3299, 54, 'Maya Chen'),
  ('22222222-2222-2222-2222-222222222107', 'CER-107', 'Breath Kit', 'recovery', 4599, 31, 'Jordan Hale'),
  ('22222222-2222-2222-2222-222222222108', 'CER-108', 'Desk Light', 'workspace', 7400, 12, 'Sam Ortiz'),
  ('22222222-2222-2222-2222-222222222109', 'CER-109', 'Hydrate Mix', 'beverages', 1599, 200, 'Priya Shah'),
  ('22222222-2222-2222-2222-222222222110', 'CER-110', 'Stretch Bands', 'recovery', 2799, 88, 'Jordan Hale'),
  ('22222222-2222-2222-2222-222222222111', 'CER-111', 'Quiet Buds', 'wearables', 15900, 9, 'Sam Ortiz'),
  ('22222222-2222-2222-2222-222222222112', 'CER-112', 'Morning Blend', 'beverages', 2199, 64, 'Priya Shah');
