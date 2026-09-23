import React from 'react';

const ListingSkeleton = () => {
  return (
    <div className="listing-container listing-skeleton">
      <div className="listing-image-container">
        <div className="listing-image skeleton-image" />
      </div>

      <div className="listing-details-container">
        <div className="listing-row">
          <h5 className="listing-type skeleton-line skeleton-line-md" />
          <h5 className="listing-price skeleton-line skeleton-line-sm" />
        </div>

        <div className="listing-row">
          <h5 className="listing-bedrooms skeleton-line skeleton-line-sm" />
          <span className="divider" />
          <h5 className="listing-rooms skeleton-line skeleton-line-sm" />
        </div>

        <div className="listing-row listing-icons-container">
          <div className="listing-icon-container">
            <div className="listing-icon skeleton-icon" />
            <h5 className="listing-house-size skeleton-line skeleton-line-sm" />
          </div>

          <div className="listing-icon-container">
            <div className="listing-icon skeleton-icon" />
            <h5 className="listing-plot-size skeleton-line skeleton-line-sm" />
          </div>
        </div>

        <div className="listing-row">
          <div className="listing-icon skeleton-icon" />
          <h5 className="listing-location skeleton-line skeleton-line-lg" />
        </div>

        <div className="listing-row listing-agent-container">
          <h5 className="listing-agent skeleton-line skeleton-line-md" />
          <h5 className="listing-ref skeleton-line skeleton-line-sm" />
        </div>
      </div>
    </div>
  )
}

export default ListingSkeleton;
