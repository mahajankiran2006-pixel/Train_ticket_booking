import React from 'react'

export default function Toptr() {
    return (
        <>
            <div className="containert mt-4">
                <ul className="nav nav-tabs" id="routeTabs" role="tablist">

                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="train1-tab" data-bs-toggle="tab" data-bs-target="#train1" type="button" role="tab">Popular Train Routes</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="train2-tab" data-bs-toggle="tab" data-bs-target="#train2" type="button" role="tab">Top Train Routes</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="plan-tab" data-bs-toggle="tab" data-bs-target="#plan" type="button" role="tab">Plan Your Trip</button>
                    </li>
                </ul>

                <div className="tab-content border border-top-0 p-3" id="routeTabsContent">


                    {/* Popular Train Routes */}
                    <div className="tab-pane fade show active" id="train1" role="tabpanel">
                        <div className="row">
                            <div className="col-md-3">Ahmedabad To Mumbal Trains</div>
                            <div className="col-md-3">Chennai To Bengaluru Trains</div>
                            <div className="col-md-3"> Delhi To Lucknow Trains</div>
                            <div className="col-md-3">Hyderabad To Tirupati Trains</div>
                            <div className="col-md-3">Bengaluru To Chennai Trains</div>
                            <div className="col-md-3">Chennai To Coimbatore Trains</div>
                            <div className="col-md-3">Delhi To Mumbai Trains</div>
                            <div className="col-md-3">Jaipur To Delhi Trains</div>
                            <div className="col-md-3">Bengaluru To Delhi Trains</div>
                            <div className="col-md-3">Delhi To Agra Trains</div>
                            <div className="col-md-3">Delhi To Varanasi Trains</div>
                            <div className="col-md-3">Mumbai To Bengaluru Trains</div>
                            <div className="col-md-3">Bengaluru To Mysore Trains</div>
                            <div className="col-md-3">Delhi To Jaipur Trains</div>
                            <div className="col-md-3">Hyderabad To Delhi Trains</div>
                            <div className="col-md-3">Patna To Delhi Trains</div>
                            <div className="col-md-3">Bengaluru To Goa Trains</div>
                            <div className="col-md-3">Delhi To Bengaluru Trains</div>
                            <div className="col-md-3">Hyderabad To Bengaluru Trains </div>
                            <div className="col-md-3"> Mumbai To Delhi Trains</div>
                        </div>
                    </div>

                    {/* Top Train Routes */}
                    <div className="tab-pane fade" id="train2" role="tabpanel">
                        <div className="row">
                            <div className="col-md-3">Hyderabad To Tirupati Trains</div>
                            <div className="col-md-3">Jaipur To Mumbai Trains</div>
                            <div className="col-md-3">Chennai To Delhi Trains</div>
                            <div className="col-md-3">Kanpur To Delhi Trains</div>
                            <div className="col-md-3">Surat To Ahmedabad Trains</div>
                            <div className="col-md-3">Agra To Delhi Trains</div>
                            <div className="col-md-3">Delhi To Hyderabad Trains</div>
                            <div className="col-md-3">Hyderabad To Delhi Trains</div>
                            <div className="col-md-3">Bengaluru To Shimoga Trains</div>
                            <div className="col-md-3">Chennai To Hyderabad Trains</div>
                            <div className="col-md-3">Hyderabad To Bengaluru Trains</div>
                            <div className="col-md-3">Mumbai To Nagpur Trains</div>
                            <div className="col-md-3">Delhi To Jodhpur Trains</div>
                            <div className="col-md-3">Hyderabad To Chennai Trains</div>
                            <div className="col-md-3">Delhi To Kanpur Trains</div>
                            <div className="col-md-3">Ahmedabad To Surat Trains</div>
                            <div className="col-md-3">Gwalior To Delhi Trains</div>
                            <div className="col-md-3">Delhi To Mathura Trains</div>
                            <div className="col-md-3">Lucknow To Mumbai Trains</div>
                            <div className="col-md-3">Ludhiana To Delhi Trains</div>
                        </div>
                    </div>



                    {/* Plan Your Trip */}
                    <div className="tab-pane fade" id="plan" role="tabpanel">
                        <div className="row">
                            <div className="col-md-3"> Udaipur Plan</div>
                            <div className="col-md-3">Goa Plandiv</div>
                            <div className="col-md-3">  Kodaikanal Plan</div>
                            <div className="col-md-3">  Darjeeling Plan</div>
                            <div className="col-md-3">Havelock Island Plan</div>
                            <div className="col-md-3">  Ayodhya Plan</div>
                            <div className="col-md-3">Leh Ladakh Plan</div>
                            <div className="col-md-3">Varanasi Plan</div>
                            <div className="col-md-3">Agra Plan</div>
                            <div className="col-md-3"> Amritsar Plan</div>
                            <div className="col-md-3">Rishikesh Plan</div>
                            <div className="col-md-3"> Kochi Plan</div>
                            <div className="col-md-3"> Bengaluru Plan</div>
                            <div className="col-md-3">  Mumbai Plan</div>
                            <div className="col-md-3"> Jaipur Plan</div>
                            <div className="col-md-3"> Sri Nagar Plan</div>
                            <div className="col-md-3">    Shimla Plan</div>
                            <div className="col-md-3">  Hyderabad Plan</div>
                            <div className="col-md-3">Chennai Plan</div>
                            <div className="col-md-3"> Pondicherry Plan</div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}