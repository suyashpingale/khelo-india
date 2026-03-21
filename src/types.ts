/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Screen = 
  | 'onboarding_lang' 
  | 'onboarding_profile' 
  | 'onboarding_location' 
  | 'onboarding_privacy' 
  | 'discover' 
  | 'learn_list' 
  | 'learn_detail' 
  | 'play_entry' 
  | 'play_list' 
  | 'play_detail' 
  | 'fit_intro' 
  | 'fit_test' 
  | 'fit_results' 
  | 'my_space' 
  | 'settings';

export interface UserProfile {
  name: string;
  age: number;
  state: string;
  interests: string[];
  skillLevel: string;
  language: string;
}

export interface Sport {
  id: string;
  name: string;
  tagline: string;
  gradient: string;
  category: 'heritage' | 'standard';
  visited?: boolean;
}

export const SPORTS: Sport[] = [
  { id: 'athletics', name: 'Athletics', tagline: 'The foundation of all sports', gradient: 'bg-illus-orange', category: 'standard' },
  { id: 'football', name: 'Football', tagline: 'The beautiful game', gradient: 'bg-illus-green', category: 'standard' },
  { id: 'wrestling', name: 'Wrestling', tagline: 'Ancient strength, modern skill', gradient: 'bg-illus-red', category: 'heritage' },
  { id: 'swimming', name: 'Swimming', tagline: 'Grace in the water', gradient: 'bg-illus-blue', category: 'standard' },
  { id: 'badminton', name: 'Badminton', tagline: 'Speed and precision', gradient: 'bg-illus-violet', category: 'standard' },
  { id: 'kho-kho', name: 'Kho-Kho', tagline: 'Traditional speed tag', gradient: 'bg-illus-orange', category: 'heritage' },
  { id: 'kabaddi', name: 'Kabaddi', tagline: 'The spirit of the soil', gradient: 'bg-illus-green', category: 'heritage' },
  { id: 'mallakhamb', name: 'Mallakhamb', tagline: 'Yoga on a pole', gradient: 'bg-illus-orange', category: 'heritage' },
];
