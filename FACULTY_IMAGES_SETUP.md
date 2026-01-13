# Faculty Images Setup Guide

## Overview
Faculty member profile images are stored in the `public/faculty/` directory and referenced dynamically in the code.

## Image Location
- **Directory**: `public/faculty/`
- **Image Format**: JPG, PNG, or WebP (recommended: JPG)
- **Recommended Size**: 400x400px to 600x600px (square images work best)
- **File Naming Convention**: Use lowercase with hyphens (e.g., `rajesh-kumar.jpg`)

## Current Faculty Images

The following faculty members have image paths configured. Place the corresponding images in `public/faculty/`:

### Computer Engineering
- `/faculty/arvind-tiwari.jpg` - Dr. Arvind Tiwari
- `/faculty/sneha-reddy.jpg` - Prof. Sneha Reddy
- `/faculty/karan-malhotra.jpg` - Prof. Karan Malhotra
- `/faculty/divya-nair.jpg` - Prof. Divya Nair
- `/faculty/aditya-rao.jpg` - Prof. Aditya Rao

### Mechanical Engineering
- `/faculty/neelkanth-nikam.jpg` - Dr. Neelkanth G Nikam
- `/faculty/rahul-patel.jpg` - Prof. Rahul Patel
- `/faculty/sunita-verma.jpg` - Prof. Sunita Verma
- `/faculty/amit-kumar.jpg` - Prof. Amit Kumar
- `/faculty/kavita-nair.jpg` - Prof. Kavita Nair

### Civil Engineering
- `/faculty/v-m-natraj.jpg` - Dr. V M Natraj (HOD)
- `/faculty/vishvanath-n-kanthe.jpg` - Dr. Vishvanath N Kanthe
- `/faculty/p-a-padalkar.jpg` - Prof. P A Padalkar
- `/faculty/a-g-chaudhari.jpg` - Prof. A G Chaudhari
- `/faculty/chetan-g-joshi.jpg` - Prof. Chetan G Joshi
- `/faculty/t-a-kulkarni.jpg` - Dr. T A Kulkarni
- `/faculty/p-b-shinde.jpg` - Prof. P B Shinde
- `/faculty/v-s-bhalerao.jpg` - Prof. V S Bhalerao
- `/faculty/v-v-pawar.jpg` - Prof. V V Pawar
- `/faculty/d-s-desale.jpg` - Prof. D S Desale
- `/faculty/r-k-paikarao.jpg` - Prof. R K Paikarao
- `/faculty/kamlesh-p-bhagat.jpg` - Prof. Kamlesh P Bhagat
- `/faculty/pavan-k-jadhav.jpg` - Prof. Pavan K Jadhav
- `/faculty/radheshyam-i-patil.jpg` - Prof. Radheshyam I Patil

### Electrical Engineering
- `/faculty/rahul-agrawal.jpg` - Dr. Rahul Agrawal (HOD)
- `/faculty/sunil-m-more.jpg` - Dr. Sunil M More
- `/faculty/b-g-dhabhade.jpg` - Prof. B G Dhabhade
- `/faculty/swapnil-n-jadhav.jpg` - Prof. Swapnil N Jadhav
- `/faculty/nilima-j-bhamare.jpg` - Prof. Nilima J Bhamare
- `/faculty/rutika-s-more.jpg` - Prof. Rutika S More
- `/faculty/vishakha-ananda-chavan.jpg` - Prof. Vishakha Ananda Chavan
- `/faculty/sonali-p-gosavi.jpg` - Prof. Sonali P Gosavi
- `/faculty/sushant-s-sananse.jpg` - Prof. Sushant S Sananse
- `/faculty/diba-a-ansari.jpg` - Prof. Diba A Ansari
- `/faculty/harshal-shelar.jpg` - Prof. Harshal Shelar
- `/faculty/sagar-n-deo.jpg` - Prof. Sagar N Deo
- `/faculty/pankaj-b-mahale.jpg` - Prof. Pankaj B Mahale
- `/faculty/hemant-jadhav.jpg` - Prof. Hemant Jadhav
- `/faculty/manoj-amale.jpg` - Prof. Manoj Amale

### Basic Engineering Science
- `/faculty/umakant-butkar.jpg` - Dr. Umakant D Butkar (HOD)
- `/faculty/nitin-kapoor.jpg` - Prof. Nitin Kapoor
- `/faculty/reshma-menon.jpg` - Prof. Reshma Menon
- `/faculty/suresh-nair.jpg` - Prof. Suresh Nair

### Artificial Intelligence & Data Science
- `/faculty/manoj-agarwal.jpg` - Dr. Manoj Agarwal
- `/faculty/swati-kulkarni.jpg` - Prof. Swati Kulkarni
- `/faculty/rohit-deshmukh.jpg` - Prof. Rohit Deshmukh
- `/faculty/neha-gupta.jpg` - Prof. Neha Gupta
- `/faculty/varun-pillai-ai.jpg` - Prof. Varun Pillai

### Automation & Robotics
- `/faculty/pradeep-menon.jpg` - Dr. Pradeep Menon
- `/faculty/kiran-shetty.jpg` - Prof. Kiran Shetty
- `/faculty/varun-pillai-robotics.jpg` - Prof. Varun Pillai
- `/faculty/aishwarya-nair.jpg` - Prof. Aishwarya Nair

## Fallback Behavior

If an image is not found, the system will:
1. Display the placeholder image (`/placeholder.svg`)
2. If the placeholder is also not found, show initials in a colored circle

## Adding New Faculty Images

1. **Prepare the Image**:
   - Crop to square format (1:1 aspect ratio)
   - Resize to 400x400px or 600x600px
   - Optimize for web (compress if needed)
   - Save as JPG (recommended) or PNG

2. **Name the File**:
   - Use lowercase letters
   - Replace spaces with hyphens
   - Use the format: `firstname-lastname.jpg`
   - Example: `rajesh-kumar.jpg`

3. **Place in Directory**:
   - Copy the image to `public/faculty/`
   - Ensure the filename matches the path in the code

4. **Update Code** (if needed):
   - The image path should match: `/faculty/filename.jpg`
   - Update the `image` property in the faculty member object

## Image Optimization Tips

- **Format**: Use JPG for photos, PNG for images with transparency
- **Size**: Keep file sizes under 200KB for fast loading
- **Dimensions**: 400x400px to 600x600px works best for avatars
- **Quality**: Balance between file size and image quality (85-90% quality for JPG)

## Testing

After adding images:
1. Restart the development server
2. Navigate to any engineering department page
3. Check the Faculty section
4. Verify images display correctly
5. Check browser console for any 404 errors (missing images)

## Notes

- All image paths are relative to the `public` folder
- The `public` folder is served at the root URL (`/`)
- Images are cached by the browser, so hard refresh (Ctrl+F5) may be needed to see updates
- The Avatar component automatically handles missing images with fallback to initials
