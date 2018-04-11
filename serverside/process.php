<?php
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Header: *');
        $uiid = uniqid();
                $target_dir = "imgin/";
                $target_file = $target_dir . basename($uiid) . '.' . strtolower(pathinfo($target_dir . basename($_FILES["fileToUpload"]["name"]),PATHINFO_EXTENSION));
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                // Check if image file is a actual image or fake image
                if(isset($_POST["submit"])) {
                                $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
                                if($check !== false) {
                                                //echo "File is an image - " . $check["mime"] . ".";
                                                $uploadOk = 1;
                                } else {
                                                echo "File is not an image.";
                                                $uploadOk = 0;
                                }
                }
                // Check if file already exists
                if (file_exists($target_file)) {
                                echo "Sorry, file already exists.";
                                $uploadOk = 0;
                }
                // Check file size
                if ($_FILES["fileToUpload"]["size"] > 1500000) {
                                echo "Sorry, your file is too large.";
                                $uploadOk = 0;
                }
                // Allow certain file formats
                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" ) {
                                echo "Sorry, only JPG, JPEG, PNG files are allowed. You uploaded: " . $imageFileType;
                                $uploadOk = 0;
                }
                // Check if $uploadOk is set to 0 by an error
                if ($uploadOk == 0) {
                                echo "Sorry, your file was not uploaded.";
                // if everything is ok, try to upload file
                } else {
                                if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                                                //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                                } else {
                                                echo "Sorry, there was an error uploading your file.";
                                }
                }

                $noteshrinkCommand = 'python3 /opt/noteshrink/noteshrink.py ./imgin/' . $uiid . '.' . $imageFileType . ' -b ./img/' . $uiid;

        if( $uploadOk )
        {
                exec( "$noteshrinkCommand 2>&1 &", $output );
                //foreach ($output as $line) echo "$line\n";
                $imageout = file_get_contents( './img/' . $uiid . '0000.png');
                if ( ! ($imageout === false) )
                {
                        //$imageoutb64 = base64_encode ( $imageout );
                        //echo $imageoutb64;
                        echo $imageout;
                        //shell_exec( "rm ./imgin/" . $uiid . ".png" );
                        //shell_exec( "rm ./img/" . $uiid . "0000.png");
                }
                else { echo "0x1"; }
        }
        else { echo "0x2"; }
?>
