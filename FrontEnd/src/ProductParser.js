// ProductParser.js

// -----------------------------------------------------------------------------
// This is the generalized parser function for Amazon product details.
// It uses regular expressions to extract data based on specific text patterns.
// -----------------------------------------------------------------------------
const parseAmazonProductDetails = (text) => {
    const details = {
        "product_name": "N/A",
        "brand_name": "N/A",
        "rating": "N/A",
        "ratings_count": "N/A",
        "units_bought_last_month": "N/A",
        "current_price": "N/A",
        "mrp": "N/A",
        "savings_percentage": "N/A"
    };

    // Note: The original code used `re`, but the logic was already
    // written with native JS `String.prototype.match()`.
    // We'll keep the direct native JS regex.

    try {
        const productNameMatch = text.match(/^(.*?)(?:Visit the)/s);
        if (productNameMatch) {
            details.product_name = productNameMatch[1].trim();
        }

        const brandNameMatch = text.match(/Visit the (.+?) Store/);
        if (brandNameMatch) {
            details.brand_name = brandNameMatch[1].trim();
        }

        const ratingMatch = text.match(/(\d+\.\d+)\s+out of 5 stars\s*([\d,]+)\s+ratings/);
        if (ratingMatch) {
            details.rating = parseFloat(ratingMatch[1]);
            details.ratings_count = parseInt(ratingMatch[2].replace(/,/g, ''), 10);
        }

        const unitsBoughtMatch = text.match(/(\d+K\+)\s+bought\s+in\s+past\s+month/);
        if (unitsBoughtMatch) {
            details.units_bought_last_month = unitsBoughtMatch[1].trim();
        }

        const currentPriceMatch = text.match(/₹(\d{1,3}(?:,\d{3})*\.\d{2})/);
        if (currentPriceMatch) {
            details.current_price = parseFloat(currentPriceMatch[1].replace(/,/g, ''));
        }

        const mrpMatch = text.match(/M\.R\.P\.:\s*₹(\d{1,3}(?:,\d{3})*\.\d{2})/);
        if (mrpMatch) {
            details.mrp = parseFloat(mrpMatch[1].replace(/,/g, ''));
        }

        const savingsMatch = text.match(/(\d+)\s*percent\s+savings/);
        if (savingsMatch) {
            details.savings_percentage = parseInt(savingsMatch[1], 10);
        } else {
            const fallbackSavingsMatch = text.match(/(-?\d+)\%/);
            if (fallbackSavingsMatch) {
                details.savings_percentage = parseInt(fallbackSavingsMatch[1], 10);
            }
        }
    } catch (e) {
        console.error("Parsing error:", e);
    }

    return details;
};

export default parseAmazonProductDetails;