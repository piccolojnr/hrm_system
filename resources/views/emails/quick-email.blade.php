<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $subject }}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #dddddd;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
            color: #333333;
        }

        .email-content {
            padding: 20px 0;
        }

        .email-content p {
            margin: 0;
            font-size: 16px;
            color: #555555;
        }

        .email-footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dddddd;
        }

        .email-footer p {
            margin: 0;
            font-size: 14px;
            color: #999999;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>{{ $subject }}</h1>
        </div>
        <div class="email-content">
            <p>{{ $messageContent }}</p>
        </div>
        <div class="email-footer">
            <p>Thank you,<br>{{ $user->name }}</p>
        </div>
    </div>
</body>

</html>
