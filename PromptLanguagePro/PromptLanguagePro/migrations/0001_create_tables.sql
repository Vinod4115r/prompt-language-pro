-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY NOT NULL,
  email VARCHAR(255) UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create session storage table for Replit Auth
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR(255) PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);

-- Create example_prompts table if it doesn't exist yet
CREATE TABLE IF NOT EXISTS example_prompts (
  id SERIAL PRIMARY KEY,
  original_text TEXT NOT NULL,
  enhanced_text TEXT NOT NULL,
  language VARCHAR(50) NOT NULL,
  tone VARCHAR(50),
  role VARCHAR(50)
);

-- Create index on the expire column of the sessions table
CREATE INDEX IF NOT EXISTS IDX_session_expire ON sessions (expire);

-- Insert some example prompts if there are none
INSERT INTO example_prompts (original_text, enhanced_text, language, tone, role)
SELECT 
  'मुझे एक बायोडाटा बनवाना है', 
  'मैं एक पेशेवर रिज्यूमे बनाने में आपकी सहायता करूँगा। अपने शैक्षिक योग्यता, अनुभव, कौशल और उपलब्धियों के बारे में जानकारी प्रदान करें।', 
  'Hindi', 
  'Professional', 
  'Career Coach'
WHERE NOT EXISTS (SELECT 1 FROM example_prompts LIMIT 1);

INSERT INTO example_prompts (original_text, enhanced_text, language, tone, role)
SELECT 
  'ಕನ್ನಡದಲ್ಲಿ ಒಂದು ಕಥೆ ಹೇಳಿ', 
  'ನಾನು ಒಂದು ಕಥೆ ಹೇಳುತ್ತೇನೆ. ಒಂದು ಸಣ್ಣ ಹಳ್ಳಿಯಲ್ಲಿ ಒಬ್ಬ ಬುದ್ಧಿವಂತ ರೈತ ಇದ್ದನು. ಅವನ ಹೆಸರು ರಾಮು. ಅವನು ತನ್ನ ಜಮೀನಿನಲ್ಲಿ ಹಲವಾರು ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯುತ್ತಿದ್ದನು.', 
  'Kannada', 
  'Creative', 
  'Friend'
WHERE NOT EXISTS (SELECT 1 FROM example_prompts WHERE language = 'Kannada' LIMIT 1);

INSERT INTO example_prompts (original_text, enhanced_text, language, tone, role)
SELECT 
  'How can I improve my English speaking skills?', 
  'I''ll provide a detailed and well-structured response to help you improve your English speaking skills. Consider these effective strategies: 1) Practice daily conversation with native speakers, 2) Listen to English podcasts and videos, 3) Read aloud to improve pronunciation, 4) Join language exchange groups, 5) Record yourself speaking to identify areas for improvement.', 
  'English', 
  'Professional', 
  'Teacher'
WHERE NOT EXISTS (SELECT 1 FROM example_prompts WHERE language = 'English' LIMIT 1);

INSERT INTO example_prompts (original_text, enhanced_text, language, tone, role)
SELECT 
  'தேர்வுக்கு எப்படி படிப்பது?', 
  'நான் ஒரு ஆசிரியராக செயல்படுவேன். தேர்வுக்கு தயாராவதற்கான விரிவான திட்டத்தை உருவாக்குவோம். முதலில், பாடப்பொருளை சிறு பகுதிகளாகப் பிரித்து, தினசரி படிப்பு அட்டவணையை உருவாக்குங்கள். முந்தைய கேள்வித்தாள்களை பயிற்சி செய்யுங்கள், குறிப்புகள் எழுதுங்கள், மற்றும் வழக்கமான இடைவெளியில் உங்கள் புரிதலை சோதித்துக்கொள்ளுங்கள்.', 
  'Tamil', 
  'Instructional', 
  'Academic Advisor'
WHERE NOT EXISTS (SELECT 1 FROM example_prompts WHERE language = 'Tamil' LIMIT 1);